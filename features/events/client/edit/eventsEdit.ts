Template['eventsEdit'].events({
    'submit form': function(e) {
        e.preventDefault();
        let event = this;
        event.name = e.target.name.value;
        event.date = moment(e.target.date.value).toDate();
        event.code = e.target.code.value;
        event.nameField = e.target.nameField.value;
        Meteor.call('saveEvent', event);
        Router.go('eventsIndex');
    }
});
