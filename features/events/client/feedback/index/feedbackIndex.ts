Template['feedbackIndex'].events({
    'click .fetch-feedback-command': function(event) {
        event.preventDefault();
        Meteor.call('fetchFeedback', this._id);
    }
});

Template['feedbackIndex'].helpers({
    getAnswerValue: function(question, answers) {
        return answers[question.id];
    }
});
