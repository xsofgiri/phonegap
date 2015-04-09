OneTo1.Router.map(function () {
    this.resource('landingPage', { path: '/' });
    this.resource('registration');
    this.resource('selfHelp');
    this.resource('articlesList', { path: '/articlesList/:subCatId'});
    this.resource('articles', { path: '/articles/:subCatId/:articleId'});
    this.resource('onlineCounselling');
    this.resource('issue');
    this.resource('assesments');
    this.resource('assesmentdetails', { path: '/assesmentdetails/:assessmentId'});
    this.resource('assesmentquestion', { path: '/assesmentquestion/:assessmentId'});
    this.resource('issueopen', { path: '/issueopen/:caseId'});
    this.resource('intake', { path: '/intake/:caseId'});
    this.resource('appointments');
    this.resource('forgotpassword');

    this.resource('issueDetails', { path: '/issueDetails/:sessionId' });
    this.resource('feedback');
});
