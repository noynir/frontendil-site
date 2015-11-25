Template['eventsEdit'].events({
    'submit form': function(e) {
        e.preventDefault();
        let event = this;
        let target = e.target;
        event.identifier = target.identifier.value;
        event.name = target.name.value;
        event.date = moment(target.date.value).toDate();
        event.typeformCode = target.typeformCode.value;
        event.typeformNameField = target.typeformNameField.value;
        Meteor.call('saveEvent', event);
        Router.go('events.index');
    }
});
