const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// this is the first EndPoint that handles incoming HTTP GET requests
router.route('/').get((req, res) => {
    
    // .find() is a Mongoose method --> it gets a list of all the users from the 
    // MongoDB Atlas database, the method return a Promise
    Exercise.find()
    .then(exercises =>{
        console.log("all the versions")
        res.json(exercises)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const date = Date.parse(req.body.date);
    const description = req.body.description;
    const code = req.body.code;
    const versions = [];
    const parts = Number(req.body.parts);

    const newExercise = new Exercise({
        title,
        date,
        description,
        code,
        versions,
        parts,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Update Exercise text from displayExercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        console.log(req.body);
        exercise.code = req.body;

        
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Update
  router.route('/edit/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
      console.log(req.body);

      // I NEED TO CHANGE IN THE EDITING PAGE WHAT I PASS IN THIS FUNCTION (REQ.BODY)
      //exercise.code = req.body;
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });

// To find the single exercise
router.route('/title/:title?').get((req, res) => {
    Exercise.findOne({title: req.params.title})
      .then(exercise => {
        res.json(exercise);
        })
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Find and delete and exercise
router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;