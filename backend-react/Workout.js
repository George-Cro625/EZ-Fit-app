// Workout Schema for entering data to database

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    reps: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);