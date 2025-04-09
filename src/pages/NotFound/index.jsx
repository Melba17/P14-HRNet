import { Link } from 'react-router-dom';
import './style.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
      <div className="notfound-link-wrapper">
        <Link to="/" className="notfound-link">Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
