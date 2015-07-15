Meteor.methods({
    savePrize: function(prize) {
        Prizes.upsert(
            { _id: prize._id },
            prize
        );
    }
});
