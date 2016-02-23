Meteor.methods({
    clearFeedback: function (id) {
        var result = Events.update(
            {_id: id},
            {
                $set: {
                    questions: [],
                    responses: []
                }
            }
        );
        console.log('clearFeedback result:', result);
        return !!result;
    }
});
