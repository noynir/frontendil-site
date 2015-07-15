Router.route('feedbackIndex', {
    path: '/events/:_id/feedback',
    data: function() {
        return Events.findOne({ _id: this.params._id });
    }
});
