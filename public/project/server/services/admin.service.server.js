"use strict";

module.exports = function(app, adminModel) {



    app.get('/api/admin/user', getUser);
    app.post("/api/admin/logout", logout);
    app.get("/api/admin/user/:id", findUserById);
    app.put("/api/admin/user/:id", updateUserById);



    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            var usr = findUserByCredentials(req, res);
            console.log(req.session);
            req.session.currentUser = usr;
            return usr;
        } else if (req.query.username) {
            return findUserByUsername(req, res);
        } else {
            return findAllUsers(req, res);
        }
    }

    function findAllUsers(req, res) {

        res.json(adminModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.id;

        res.json(adminModel.findUserById(userId));

    }

    function findUserByUsername(req, res) {
        console.log("on server services, findUserByUsername")

        var userUsername = req.query.username;
        console.log(userUsername)

        res.json(adminModel.findUserByUsername(userUsername));
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.query.username, "password": req.query.password};

        console.log("on server, validating credentails")
        res.json(adminModel.findUserByCredentials(userCredentials));
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        console.log("updated obj received on server")
        console.log(userObj)

        res.json(adminModel.updateUserById(userId, userObj));
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

}