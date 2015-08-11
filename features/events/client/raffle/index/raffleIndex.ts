Template['raffleIndex'].events({
    'click .raffle-prizes-command': function(e) {
        e.preventDefault();
        Meteor.call('rafflePrizes', this.event._id);
    },
    'click .raffle-person-command': function(e) {
        e.preventDefault();
        Meteor.call('rafflePerson', this.event._id);
    },
    'click .reset-raffle-command': function(e) {
        e.preventDefault();
        Meteor.call('resetRaffle', this.event._id);
    }
});

Template['raffleIndex'].helpers({
    getWinnerName: function(event) {
        let nameField = event.typeformNameField;

        let projection = {};
        let key = 'responses.answers.' + nameField;
        projection[key] = true;

        let response: any = _(event.responses).findWhere({ id: this.responseId });
        let name = '';
        if(response && response.answers) {
            name = response.answers[nameField];
        }
        return name;
    },
    getPrizeName: function() {
        let prize = Prizes.findOne(this.prizeId);
        let prizeName = prize ? prize.name : '<unspecified>';
        return prizeName;
    }
});
