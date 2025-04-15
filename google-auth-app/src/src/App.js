import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

// Simple Home Page
const HomePage = () => {
  return <h1>Welcome to the Home Page</h1>;
};

// Login Component with Google Login
const LoginPage = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogin = (response) => {
    const decoded = jwtDecode(response.credential);
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    });
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.log("Login Failed")}
        />
      ) : (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="321650566263-tga8hn9kb1v6hll99jpndgt964h8vsdo.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage user={user} setUser={setUser} />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
