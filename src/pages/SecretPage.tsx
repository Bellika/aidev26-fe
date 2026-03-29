import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSecretData, SecretData } from '../services/api';
import './SecretPage.css';

export default function SecretPage() {
  const [secretData, setSecretData] = useState<SecretData | null>(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Fetch secret data from backend with JWT token
    const fetchSecret = async () => {
      try {
        const data = await getSecretData();
        setSecretData(data);
      } catch {
        setError('Could not fetch secret data');
      }
    };

    fetchSecret();
  }, []);

  return (
    <div className="page-container">
      <h1>Secret Page</h1>
      <p className="intro-text">This is a protected route. You can only see this if you are logged in!</p>

      {user && (
        <div className="context-info">
          <p><strong>Context shows:</strong> {user.username}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {secretData && (
        <div className="secret-data">
          <h2>{secretData.message}</h2>
          <p className="secret-text">{secretData.secret}</p>
          <p className="note"><em>{secretData.note}</em></p>
          <hr />
          <p><strong>Backend verified JWT and returned:</strong></p>
          <ul>
            <li>User ID: {secretData.user.user_id}</li>
            <li>Username: {secretData.user.username}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
