function setMessage(message, error) {
    Session.set('raffle-message', error ? (error.message ? error.text : error) : message);
}

Template['raffleIndex'].events({
    'click .raffle-prizes-command': function(e) {
        e.preventDefault();
        setMessage('raffling');
        Meteor.call('rafflePrizes', this.event._id, function (error) {
            setMessage('raffled all prizes', error);
        });
    },
    'click .raffle-person-command': function(e) {
        e.preventDefault();
        setMessage('raffling');
        Meteor.call('rafflePerson', this.event._id, function (error) {
            setMessage('raffled one prize', error);
        });
    },
    'click .reset-raffle-command': function(e) {
        e.preventDefault();
        setMessage('resetting');
        Meteor.call('resetRaffle', this.event._id, function (error) {
            setMessage('reset the raffle', error);
        });
    },
    'click .fetch-feedback-command': function(e) {
        e.preventDefault();
        setMessage('fetching');
        Meteor.call('fetchFeedback', this.event._id, function (error) {
            setMessage('fetched', error);
        });
    }
});

Template['raffleIndex'].helpers({
    getWinnerName: function(event) {
         console.log(event);
        let nameField = event.typeformNameField;
        let projection = {};
        let key = 'responses.answers.' + nameField;
        projection[key] = true;
        console.log('this:'+JSON.stringify(this));
        let response: any = _(event.responses).findWhere({ token: this.responseId });

        let name = '';
        if(response && response.answers) {
            name = response.answers[nameField];
        }
        return name;
    },
    getPrizeName: function() {
        let prize = Prizes.findOne(this.prizeId)    ;
        let prizeName = prize ? prize.name : '<unspecified>';
        return prizeName;
    },
    message: function() {
        return Session.get('raffle-message');
    }
});
