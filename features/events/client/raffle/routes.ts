Router.route('raffleIndex', {
    path: '/events/:_id/raffle',
    data: function() {
        return {
            event: Events.findOne({ _id: this.params._id }),
            prizes: Prizes.find()
        };
    }
});
