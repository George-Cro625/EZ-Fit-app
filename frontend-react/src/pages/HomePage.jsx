
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function HomePage() {

    const [selectedExercise, setSelectedExercise] = useState(null);

    const [weight, setWeight] = useState(135);
    const [reps, setReps] = useState(10);

    const [sliderMode, setSliderMode] = useState("weight");

    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    // Most recent workout
    const [latestWorkout, setLatestWorkout] = useState(null);

    // Available exercises
    const exercises = [
        {
            name: "Squats",
            image: "/images/squats.png"
        },
        {
            name: "Bicep Curls",
            image: "/images/bicep%20curls.png"
        }
    ];

    // Load latest workout when homepage opens
    useEffect(() => {

        const fetchLatestWorkout = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/workouts/latest"
                );

                if (!response.ok) {
                    throw new Error("Failed to retrieve workout.");
                }

                const data = await response.json();

                setLatestWorkout(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchLatestWorkout();

    }, []);

    // Select an exercise
    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
        setWeight(135);
        setReps(10);
        setSliderMode("weight");
        setMessage("");
    };

    // Send workout to MongoDB
    const handleRecordExercise = async (e) => {
        e.preventDefault();

        if (
            !selectedExercise ||
            weight === "" ||
            reps === ""
        ) {
            setMessage("Please select an exercise and enter weight and reps.");
            return;
        }

        if (Number(weight) <= 0 || Number(reps) <= 0) {
            setMessage("Weight and reps must be greater than zero.");
            return;
        }

        setSaving(true);
        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:3000/api/workouts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        exercise: selectedExercise.name,
                        weight: Number(weight),
                        reps: Number(reps)
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save workout.");
            }

            // Receive the newly saved MongoDB document
            const savedWorkout = await response.json();

            // Immediately update latest workout
            setLatestWorkout(savedWorkout);

            setMessage("Workout successfully recorded!");

            // Clear exercise selection
            setSelectedExercise(null);
            setWeight(135);
            setReps(10);

        } catch (error) {
            setMessage("Error saving workout. Please try again.");
            console.error(error);

        } finally {
            setSaving(false);
        }
    };

    return (
        <div>

            <h1>EZ-Fit</h1>

            <nav className="home-nav">
                <div className="nav-left">
                    <Link to="/home">Home</Link>
                    <Link to="/profile">Profile/Past Workouts</Link>
                </div>

                <div className="nav-right">
                    <Link to="/login">Logout</Link>
                </div>
            </nav>

            <h2>Daily Stats</h2>

            <p>Total Calories Burned:</p>
            <p>Total Volume moved:</p>

            <p>
                <b>
                    1. Choose an Exercise <br />
                    2. Enter weight & reps <br />
                    3. Click "Record Exercise" <br />
                </b>
            </p>

            <p>Your workout dashboard.</p>

            {/* Exercise selection */}
            <div className="image-container">

                {exercises.map((exercise) => (
                    <button
                        type="button"
                        key={exercise.name}
                        className={`exercise-button ${
                            selectedExercise?.name === exercise.name
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => handleExerciseSelect(exercise)}
                    >
                        <img
                            src={exercise.image}
                            alt={exercise.name}
                            className="exercise-image"
                        />

                        <p>{exercise.name}</p>
                    </button>
                ))}

            </div>

            {/* Workout form */}
            {selectedExercise && (

                <div className="workout-form">

                    <h2>Record {selectedExercise.name}</h2>

                    {/* Switch between weight and reps */}
                    <div className="slider-toggle">

                        <button
                            type="button"
                            className={sliderMode === "weight" ? "active" : ""}
                            onClick={() => setSliderMode("weight")}
                        >
                            Weight
                        </button>

                        <button
                            type="button"
                            className={sliderMode === "reps" ? "active" : ""}
                            onClick={() => setSliderMode("reps")}
                        >
                            Reps
                        </button>

                    </div>

                    {/* Current slider value */}
                    <h3>
                        {sliderMode === "weight"
                            ? `${weight} lbs`
                            : `${reps} reps`}
                    </h3>

                    {/* Slider */}
                    <input
                        type="range"
                        min={sliderMode === "weight" ? 0 : 1}
                        max={sliderMode === "weight" ? 500 : 50}
                        step={sliderMode === "weight" ? 5 : 1}
                        value={sliderMode === "weight" ? weight : reps}
                        onChange={(e) => {

                            const value = Number(e.target.value);

                            if (sliderMode === "weight") {
                                setWeight(value);
                            } else {
                                setReps(value);
                            }

                        }}
                        className="vertical-slider"
                    />

                    {/* Display selections */}
                    <p>Selected Weight: {weight} lbs</p>
                    <p>Selected Reps: {reps}</p>

                    <button
                        type="button"
                        onClick={handleRecordExercise}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Record Exercise"}
                    </button>

                </div>
            )}

            {/* Submission feedback */}
            {message && (
                <p role="status">{message}</p>
            )}

            <hr />

            {/* Latest workout */}
            <h2>Most Recent Workout</h2>

            {latestWorkout ? (

                <div className="latest-workout">

                    <h3>{latestWorkout.exercise}</h3>

                    <p>
                        Weight: {latestWorkout.weight} lbs
                    </p>

                    <p>
                        Reps: {latestWorkout.reps}
                    </p>

                    <p>
                        Date: {
                            new Date(latestWorkout.date)
                                .toLocaleString()
                        }
                    </p>

                </div>

            ) : (

                <p>No workouts recorded yet.</p>

            )}

        </div>
    );
}

export default HomePage;
