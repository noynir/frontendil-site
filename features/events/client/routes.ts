Router.route('eventsIndex', {
    path: '/events',
    data: function() {
        return Events.find();
    }
});

Router.route('eventsCreate', {
    path: '/events/create',
    template: 'eventsEdit',
    data: function() {
        return {};
    }
});

Router.route('eventsEdit', {
    path: '/events/:_id/edit',
    data: function() {
        return Events.findOne({ _id: this.params._id });
    }
});
