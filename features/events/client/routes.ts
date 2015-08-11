Router.route('events.index', {
    path: '/events',
    data: function() {
        return Events.find();
    }
});

Router.route('events.create', {
    path: '/events/create',
    template: 'eventsEdit',
    data: function() {
        return {};
    }
});

Router.route('events.edit', {
    path: '/events/:_id/edit',
    data: function() {
        return Events.findOne({ _id: this.params._id });
    }
});
