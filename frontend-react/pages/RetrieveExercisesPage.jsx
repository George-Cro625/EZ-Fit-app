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
                    <Link to="/LoginPage">Logout</Link>
                </div>

                <h2>Daily Stats</h2>
                <p>Total Calories Burned:</p>
                <p>Total Volume moved:</p>

                <p><b>
                    1. Choose an Exercise <br></br>
                    2. Enter weight & reps <br></br>
                    3. Click "Record Exercise"
                    </b></p>

                
            </nav>
            <p>Your workout dashboard.</p>
        
        
        </div>
    )
}

export default HomePage