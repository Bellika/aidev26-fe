import { useAuth } from '../context/AuthContext';
import './HomePage.css';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <h1>Welcome!</h1>

      {user ? (
        <div className="user-info">
          <p>You are logged in as: <strong>{user.username}</strong></p>
          <p>User ID: {user.user_id}</p>
          <p className="info-text">Use the navigation above to visit the Secret Page.</p>
        </div>
      ) : (
        <div className="welcome-message">
          <p>Welcome! Please create an account or login to continue.</p>
        </div>
      )}
    </div>
  );
}
