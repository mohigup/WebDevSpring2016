"use strict";

module.exports = function(app, gitModel) {


    app.get("/api/project/git", callGit );


    function callGit(req, res) {
        if (req.query.reponame) {
            return findRepoByUsername(req, res);
        }
    }

    function findRepoByUsername(req, res) {
        var usrObj = req.body;

        res.json(gitModel.createUser(usrObj));
    }

}