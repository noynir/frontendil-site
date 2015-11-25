Meteor.methods({
    saveEvent: function(event) {
        console.log(event);
        Events.upsert(
            { _id: event._id },
            event
        );
    }
});
