Router.route('prizesIndex', {
    path: '/prizes',
    data: function() {
        return Prizes.find();
    }
});

Router.route('prizesCreate', {
    path: '/prizes/create',
    template: 'prizesEdit',
    data: function() {
        return {};
    }
});

Router.route('prizesEdit', {
    path: '/prizes/:_id/edit',
    data: function() {
        return Prizes.findOne({ _id: this.params._id });
    }
});
