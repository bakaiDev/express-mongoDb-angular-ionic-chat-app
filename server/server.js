const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/socialapp', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) {
        console.log(err);
    }
});

app.listen('3000', () => {
    console.log('Running server on port 3000')
});
