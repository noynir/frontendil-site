Meteor.methods({
    editEventPrize: function(eventId, prizeId, amount) {
        check(eventId, String);
        check(prizeId, String);
        check(amount, Match.Integer);

        let fixId = function(sourceId) {
            return sourceId.replace('ObjectID', 'ObjectId');
        };

        eventId = fixId(eventId);
        prizeId = fixId(prizeId);

        let event = Events.findOne({ _id: eventId });
        let eventPrizes = event.prizes || [];
        let eventPrize = _.findWhere(eventPrizes, { prizeId: prizeId });

        var modifyEventPrizeAmount = function() {
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
