Meteor.publish('prizes', function() {
    return Prizes.find();
});
