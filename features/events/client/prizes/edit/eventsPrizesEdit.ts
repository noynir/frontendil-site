Template['eventsPrizesEdit'].events({
    'click .save-command': function(e, template) {
        e.preventDefault();
        let eventId = template.$('[name=event]').attr('value');
        let prizeId = this.prizeId;
        let amount = Number(template.$('[name=amount]').val());
        Meteor.call('editEventPrize', eventId, prizeId, amount);
    }
});

Template['eventsPrizesEdit'].helpers({
    getPrizeName: function() {
        let prize = Prizes.findOne(this.prizeId);
        return prize ? prize.name : '<unspecified>';
    }
});
