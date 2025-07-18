// import React, { useState } from 'react';

// async function handleSubmit(e) {
//   e.preventDefault();
//   const res = await axios.post('/api/register', { username, password, email, fullname }, { withCredentials: true });
//   if (res.data.success) {
//     navigate('/'); // redirect to HomeDashboard
//   } else {
//     setError(res.data.error);
//   }
// }
// export default Register; 
// src/pages/Register.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import './AuthPage.css'; // Uses shared styling

export default function Register() {
   

  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
 //const [flds, setFlds] = useState({ username: '', password: '', email: '', fullname: '' });
  const [error, setError] = useState(null);
  

//const handleChange = e => setFlds(f => ({...f, [e.target.name]: e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault();
     try {
      await register({ username, password, email, fullname });
      navigate('/watchlist');  // or wherever you want
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }
  


  return (
    <div className="container">
      <div className="content">
        <p className="header">Make an account to see more</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="detail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="detail"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            className="detail"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="detail"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn int">Register account</button>
        </form>

        <p className="or">OR</p>
        <button className="btn fbk">Continue with Facebook</button>
        <button className="btn ggl">Continue with Google</button>

        <footer>
          <p>
            By continuing, you agree to WatchWhiz.x&nbsp;
            <b>Terms of Service, Privacy policy</b>.
          </p>
          <hr />
          <a href="/login">Already have an account? Log in</a>
        </footer>
      </div>
    </div>
  );
}
