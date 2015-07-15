Meteor.methods({
    editEventPrize: function(eventId, prizeId, amount) {
        check(eventId, String);
        check(prizeId, String);
        check(amount, Match.Integer);

        console.log('editEventPrize', 'eventId:', eventId, 'prizeId:', prizeId, 'amount:', amount);

        let event = Events.findOne({ _id: eventId });
        let eventPrizes = event.prizes || [];
        let eventPrize = _.findWhere(eventPrizes, { prizeId: prizeId });

        var modifyEventPrizeAmount = function() {
            console.log('updating event prize');
            Events.update(
                {
                    _id: eventId,
                    'prizes.prizeId': prizeId
                },
                {
                    $set: {
                        'prizes.$.amount': amount
                    }
                }
            );
        };
        var removeEventPrize = function() {
            console.log('removing event prize');
            Events.update(
                {
                    _id: eventId
                },
                {
                    $pull: {
                        prizes: {
                            prizeId: prizeId
                        }
                    }
                }
            );
        };
        var addEventPrize = function() {
            console.log('adding event prize');
            Events.update(
                {
                    _id: eventId
                },
                {
                    $push: {
                        prizes: {
                            prizeId: prizeId,
                            amount: amount
                        }
                    }
                }
            );
        };

        if(eventPrize && amount > 0) {
            modifyEventPrizeAmount();
        }
        else if(eventPrize) {
            removeEventPrize();
        }
        else {
            addEventPrize();
        }
    }
});
