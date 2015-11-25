Template['friendlyDate'].helpers({
    render: function() {
        return moment(this).format('YYYY-MM-DD');
    }
});
