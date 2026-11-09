import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>EZ-Fit</h1>

             <nav className="home-nav">
                <div className="nav-left">
                    <Link to="/home">Home</Link>
                    <Link to="/ProfilePage">Profile/Past Workouts</Link>
                </div>

                <div className="nav-right">
                    <Link to="/login">Logout</Link>
                </div>
            </nav>

                <h2>Daily Stats</h2>
                <p>Total Calories Burned:</p>
                <p>Total Volume moved:</p>

                <p><b>
                    1. Choose an Exercise <br></br>
                    2. Enter weight & reps <br></br>
                    3. Click "Record Exercise"<br></br>
                    </b></p>
            <p>Your workout dashboard.</p>

               <img src="/images/squats.png"
               alt="Bench Press" 
               className="exercise-image"
               />

               <img src="/images/bicep%20curls.png"
               alt="Bench Press" 
               className="exercise-image"
               />
                
        
        </div>
    )
}

export default HomePage