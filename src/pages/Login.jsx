
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // const [flds, setFlds] = useState({ username: '', password: '' });
  // const handleChange = e => setFlds(f => ({...f, [e.target.name]: e.target.value}));
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ username, password });
      navigate('/watchlist'); // Success: redirect to home/dashboard
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="content">
        
        <p className="header">Login to your account</p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-container">
          <input
            type="text"
            name="username"
            className="detail"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="detail"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          </div>
          <button type="submit" className="btn int">Login account</button>
        </form>

        <a className="upbtn" href="/register">Sign up instead</a>

        <footer>
          <p>By continuing, you agree to our <b>Terms of Service</b></p>
          <hr />
          <p>Forgot your password?</p>
        </footer>
      </div>
    </div>
  );
  // return axios.post('/api/auth/login', { username, password }, { withCredentials: true });
}

export default Login;
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';  // make sure this path is correct
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await login({ username, password });
//       navigate('/watchlist'); // redirect on successful login
//     } catch (err) {
//       // console.error('Login failed:', err);
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
//       <button type="submit">Login</button>
//       {error && <p style={{color:'red'}}>{error}</p>}
//     </form>
//   );
// }
