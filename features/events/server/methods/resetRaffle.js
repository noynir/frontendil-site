Meteor.methods({
    resetRaffle: function(eventId) {
        check(eventId, String);

        console.log('resetRaffle', 'eventId:', eventId);

        Events.update(
            { _id: eventId },
            {
                $set: { raffle: [] }
            }
        );
    }
});
