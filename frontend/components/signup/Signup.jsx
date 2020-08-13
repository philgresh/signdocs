import React, { useState } from 'react';

const Signup = ({ currentUser, createNewUser, history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    createNewUser({ email, password, username }).then(() =>
      history.push('/chirps')
    );
  };

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        Sign Up!
      </button>
    </div>
  );
};

export default Signup;
