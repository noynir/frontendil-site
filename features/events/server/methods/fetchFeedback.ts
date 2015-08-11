Meteor.methods({
    fetchFeedback: function(id) {
        let event = Events.findOne({ _id: id });

        let handleResponse = function(error, result) {
            if(error) {
                console.log('fetchFeedback error:', error);
            }
            else {
                let data = result.data;
                let responses =
                    data.responses.
                        filter(response => response.completed !== '0');

                Events.update(
                    { _id: id },
                    {
                        $set: {
                            questions: data.questions,
                            responses: responses
                        }
                    }
                );
            }
        };

        let settings: any = Meteor.settings;
        let apiKey = settings.typeform.apiKey;
        let accountName = settings.typeform.accountName;
        let url = 'http://' + accountName + '.typeform.com/v0/form/' + event.typeformCode + '?key=' + apiKey;
        HTTP.get(url, handleResponse);
    }
});
