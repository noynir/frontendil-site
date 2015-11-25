Meteor.methods({
    rafflePerson: function(eventId) {
        check(eventId, String);

        console.log('rafflePerson', 'eventId:', eventId);

        let event = Events.findOne({ _id: eventId });

        let responseFilter = response => {
            return response.completed !== '0';
        };
        let responses = event.responses.filter(responseFilter);

        if(responses.length === 0) {
            throw new Error('No responses');
        }

        let winners = event.raffle;
        if(winners.length >= responses.length) {
            throw new Error('All potential respondents have already won');
        }

        let random = function(high) {
            return Math.floor(Math.random() * high);
        };

        let eventPrizes = event.prizes || [];
        console.log('rafflePrizes', 'eventPrizes:', eventPrizes.length);

        let iterationIndex = 0;
        let winner;
        do {
            iterationIndex++;
            let responseIndex = random(responses.length);
            console.log('iterationIndex:', iterationIndex);
            let response = responses[responseIndex];
            let previousWinner = _(winners).findWhere({ responseId: response.id });
            console.log('previousWinner:', previousWinner);
            if(!previousWinner) {
                winner = {
                    responseId: response.id
                };
                console.log('winner:', winner);
            }
        }
        while(!winner && iterationIndex < responses.length * 2);
        console.log('rafflePrizes', 'new winner:', winner);

        if(!winner) {
            throw new Error('Could not raffle a new winner');
        }

        Events.update(
            {
                _id: eventId
            },
            {
                $addToSet: {
                    raffle: winner
                }
            }
        );
    }
});
