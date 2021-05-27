const express = require('express');
const cors = require('cors');

// helps us coonecting to mongoDB
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// if (process.env.state == "debug"){
//     app.use(cors());
// }

app.use(cors());
app.use(express.json());

// Database URI
const uri = process.env.ATLAS_URI;

// useNewUrlParser --> they handle mongoDB updates and unsupported stuff
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("HELLLOOOOOOO");
})

const exercisesRouter = require('./routes/exercises');
const versionRouter = require('./routes/versions');

// when someone goes to these routes it will load everything inside these files
app.use('/exercises', exercisesRouter);
app.use('/versions', versionRouter);


app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})