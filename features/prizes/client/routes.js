Router.route('prizes.index', {
    path: '/prizes',
    data: function() {
        return Prizes.find();
    }
});

Router.route('prizes.create', {
    path: '/prizes/create',
    template: 'prizesEdit',
    data: function() {
        return {};
    }
});

Router.route('prizes.edit', {
    path: '/prizes/:_id/edit',
    data: function() {
        return Prizes.findOne({ _id: this.params._id });
    }
});
