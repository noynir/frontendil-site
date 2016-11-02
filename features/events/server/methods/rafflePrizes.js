Meteor.methods({
    rafflePrizes: function(eventId) {
        check(eventId, String);

        console.log('rafflePrizes', 'eventId:', eventId);

        let event = Events.findOne({ _id: eventId });

        let responseFilter = response => {
            return response.completed !== '0';
        };
        let responses = event.responses.filter(responseFilter);
        //console.log(responses);
        if(responses.length === 0) {
            throw new Error('No responses');
        }

        let random = function(high) {
            return Math.floor(Math.random() * high);
        };

        let eventPrizes = event.prizes || [];
        console.log('rafflePrizes', 'eventPrizes:', eventPrizes.length);

        let allEntries =
            _(eventPrizes).
                map(eventPrize => {
                    let entries = [];
                    for(var index = 0; index < eventPrize.amount; index++) {
                        entries.push({
                            prizeId: eventPrize.prizeId
                        });
                    }
                    return entries;
                });
        let winners = _.flatten(allEntries);
        let winnerCount = winners.length;
        console.log('rafflePrizes', 'winnerCount:', winnerCount);

        if(winnerCount === 0) {
            throw new Error('No prizes have been specified');
        }

        let winnerIndex = 0;
        let iterationIndex = 0;
        do {
            iterationIndex++;
            let responseIndex = random(responses.length);
            console.log('respones index:',responseIndex);
            console.log('iterationIndex:', iterationIndex);
            let response = responses[responseIndex];
            console.log('winner candidate',response);
            let previousWinner = _(winners).findWhere({ responseId: response.token });
            console.log('previousWinner:', previousWinner);
            if(!previousWinner) {
                let winner = winners[winnerIndex];
                console.log('winner:', winner);
                winner.responseId = response.token;
                winnerIndex++;
            }
            console.log('winnerIndex:', winnerIndex);
        }
        while(winnerIndex < winnerCount && iterationIndex < responses.length * 2);
        console.log('rafflePrizes', 'winners:', winners.length);
        console.log('rafflePrizes', 'winners:', winners);

        Events.update(
            {
                _id: eventId
            },
            {
                $set: {
                    raffle: winners
                }
            }
        );
    }
});
