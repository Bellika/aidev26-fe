import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>My App</h1>
        </Link>
        <nav className="nav">
          {user ? (
            <>
              <span className="welcome">Welcome, {user.username}</span>
              <Link to="/secret" className="nav-link">Secret Page</Link>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/create-account" className="nav-link">Create Account</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
