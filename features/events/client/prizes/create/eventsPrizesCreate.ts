Template['eventsPrizesCreate'].events({
    'click .save-command': function(e, template) {
        let eventId = template.$('[name=event]').attr('value');
        let prizeId = template.$('[name=prize]').val();
        let amount = Number(template.$('[name=amount]').val());
        Meteor.call('editEventPrize', eventId, prizeId, amount);
    }
});
