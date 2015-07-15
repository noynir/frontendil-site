Template['prizesEdit'].events({
    'submit form': function(e) {
        e.preventDefault();
        let prize = this;
        prize.name = e.target.name.value;
        Meteor.call('savePrize', prize);
        Router.go('prizesIndex');
    }
});
