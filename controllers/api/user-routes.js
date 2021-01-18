const router = require('express').Router();
const { User_Routes } = require('../../models');
const sequelize = require('../../config/connection');
const { findByPk } = require('../../../just-tech-news/models/Post');


// GET /api/user-routes for testing
router.get('/', (req, res) => {
    console.log("User:", req.user);
    console.log("id:", req.user.id);
    console.log("photo", req.body.photo)
});

// POST /api/user-routes - create new user-route
router.post('/', (req, res) => {


    console.log(req.user);
    //console.log("ID:" ,req.user.id);

    User_Routes.create({
        photo: req.body.photo,
        ride_time: req.body.ride_time,
        ride_link: req.body.ride_link,
        date_completed: req.body.date_completed,
        // get from session user
        user_id: req.user.id,
        // route_id from dropdown
        route_id: req.body.route_id,
    })
        .then(dbRoutesData => res.json(dbRoutesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User_Routes.findOne({
        attributes: [
            'photo']
    })

        // console.log(req.body.photo)
        .then(dbUserData => {
            console.log(dbUserData)
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.put('/:id', (req, res) => {
    if (req.user.isAdmin) {
        User_Routes.update(
            {
                photo: req.body.photo,
                ride_time: req.body.ride_time,
                ride_link: req.body.ride_link,
                date_completed: req.body.date_completed,
                route_id: req.body.route_id,
                user_id: req.session.user_id
            }
        )
            .then(dbRouteData => {
                if (!dbRouteData) {
                    res.status(404).json({ message: 'No route found with this id' });
                    return;
                }
                res.json(dbRouteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;