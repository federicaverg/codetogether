const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// this is the first EndPoint that handles incoming HTTP GET requests
router.route('/').get((req, res) => {
    
    // .find() is a Mongoose method --> it gets a list of all the users from the 
    // MongoDB Atlas database, the method return a Promise
    Exercise.find()
    .then(exercises =>{
        console.log("tutti gli esercizi")
        res.json(exercises)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const date = Date.parse(req.body.date);
    const lastAccess = Date.parse(req.body.lastAccess);
    const description = req.body.description;
    const code = req.body.code;
    const versions = [];
    const parts = Number(req.body.parts);
    const intervals = req.body.parts;

    const newExercise = new Exercise({
        title,
        date,
        lastAccess,
        description,
        code,
        versions,
        parts,
        intervals
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Object ID created automatically by MongoDB
// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => {res.json(exercise)})
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

router.route('/title/:title?').get((req, res) => {
    console.log(req.params.title);
    console.log("Sono qui");
    Exercise.findOne({title: req.params.title})
      .then(exercise => {
          console.log(exercise)
          res.json(exercise);
        })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error' + err));
});



// UPDATE EXERCISE

module.exports = router;