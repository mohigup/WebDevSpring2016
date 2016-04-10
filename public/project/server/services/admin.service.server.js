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

        adminModel.findAllUsers()
            .then(
                function(docs){
                    res.json(docs);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;

        adminModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findUserByUsername(req, res) {
        console.log("on server services, findUserByUsername")

        var userUsername = req.query.username;
        console.log(userUsername)

        console.log(userUsername)
        adminModel.findUserByUsername(userUsername)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.query.username, "password": req.query.password};

        console.log("on server, validating credentails")
        console.log("on server, validating credentails")
        adminModel.findUserByCredentials(userCredentials)
            .then(
                function(doc){
                    // ADDING FOR SESSION
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        console.log("updated obj received on server")
        console.log(userObj)

        adminModel.updateUserById(userId, userObj)
            .then(
                function(stats){
                    return adminModel.findUserById(userId);
                    //res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    console.log(user);
                    // ADDING FOR SESSION
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }

}