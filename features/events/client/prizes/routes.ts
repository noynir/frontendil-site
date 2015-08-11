Router.route('events.prizes.index', {
    path: '/events/:_id/prizes',
    data: function() {
        return {
            event: Events.findOne({ _id: this.params._id }),
            prizes: Prizes.find()
        };
    }
});
