const router = require('express').Router();
let Version = require('../models/version.model');

// this is the first EndPoint that handles incoming HTTP GET requests
router.route('/').get((req, res) => {
    
    // .find() is a Mongoose method --> it gets a list of all the users from the 
    // MongoDB Atlas database, the method return a Promise
    Version.find()
    .then(versions =>{
        console.log("all the versions")
        res.json(versions)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    //const title = req.body.title;
    const title = "User";
    const date = Date.parse(req.body.date);
    //const lastAccess = Date.parse(req.body.lastAccess);
    const description = req.body.description;
    const code = req.body.code;
    const exercise = req.body.exercise;
    const parts = Number(req.body.parts);
    //const intervals = req.body.parts;

    const newVersion = new Version({
        title,
        date,
        //lastAccess,
        description,
        code,
        exercise,
        parts,
        //intervals
    });

    newVersion.save()
    .then(() => res.json('Version added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/title/:title?').get((req, res) => {
    console.log(req.params.title);
    console.log("Getting a title");
    Version.findOne({title: req.params.title})
      .then(version => {
          console.log(version)
          res.json(version);
        })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/exercise/:exercise?').get((req,res) => {
    console.log(req.params.exercise);
    console.log("Getting a title");
    Version.find({exercise: req.params.exercise})
        .then(versions => {
            console.log(versions)
            res.json(versions);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:exerciseTitle').delete((req,res) => {
    console.log("CIAOOOO");
    console.log(req.params);
    Version.deleteMany({exercise: req.params.exerciseTitle})
    .then(() => res.json('Versions deleted.'))
    .catch(err => res.status(400).json('Error' + err));
    // Version.findByIdAndDelete(req.params.id)
    // Version.deleteMany()
    // .then(() => res.json('Version deleted.'))
    // .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req,res) => {
    Version.findByIdAndDelete(req.params.id)
    .then(() => res.json('Version deleted.'))
    .catch(err => res.status(400).json('Error' + err));
});


module.exports = router;