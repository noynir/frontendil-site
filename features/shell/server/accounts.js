Meteor.startup(function() {
    let settings: any = Meteor.settings;
    let accounts = settings.accounts;
    if(accounts) {
        let forbidClientAccountCreation = accounts.forbidClientAccountCreation;
        if(forbidClientAccountCreation) {
            Accounts.config({
                forbidClientAccountCreation: forbidClientAccountCreation,
            });
        }
        let restrictCreationByEmailDomain = accounts.restrictCreationByEmailDomain;
        if(restrictCreationByEmailDomain) {
            Accounts.config({
                restrictCreationByEmailDomain: restrictCreationByEmailDomain
            });
        }
    }
});
