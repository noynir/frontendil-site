Meteor.methods({
    saveEvent: function(event) {
        Events.upsert(
            { _id: event._id },
            event
        );
    }
});
