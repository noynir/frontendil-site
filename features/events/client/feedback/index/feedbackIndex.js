function setMessage(message, error) {
    Session.set('feedback-message', error ? error : message);
}

Template['feedbackIndex'].events({
    'click .fetch-feedback-command': function(e) {
        e.preventDefault();
        Session.set('feedback-message', 'fetching');
        Meteor.call('fetchFeedback', this._id, function(error) {
            setMessage('fetched', error);
        });
    },
    'click .clear-feedback-command': function(e) {
        e.preventDefault();
        Session.set('feedback-message', 'clearing');
        Meteor.call('clearFeedback', this._id, function(error) {
            setMessage('cleared', error);
        });
    }
});

Template['feedbackIndex'].helpers({
    getAnswerValue: function(question, answers) {
        return answers[question.id];
    },
    message: function () {
        return Session.get('feedback-message');
    }
});
