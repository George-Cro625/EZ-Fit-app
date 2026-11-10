const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Workout = require('./Workout');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Save workout
app.post('/api/workouts', async (req, res) => {
    try {
        const { exercise, weight, reps } = req.body;

        const workout = await Workout.create({
            exercise,
            weight,
            reps
        });

        res.status(201).json(workout);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Error saving workout"
        });
    }
});


// Get most recent workout
app.get('/api/workouts/latest', async (req, res) => {
    try {
        const workout = await Workout.findOne()
            .sort({ date: -1 });

        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get past workouts
app.get('/api/workouts', async (req, res) => {
    try {
        const workouts = await Workout.find()
            .sort({ date: -1 });

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});