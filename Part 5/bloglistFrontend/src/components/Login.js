import React, { useState, useEffect } from 'react'

const Login = ({ handleLogin, username, password }) => {s
  if(user.name){
    return(
      <div>{user.name} logged in</div>
    )
  }
  else{
    return(
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input 
            type="text" 
            value={username} 
            id='loginUserid' 
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password:
            <input 
            type="password" 
            value={password} 
            id='loginPassword' 
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit" id="loginButton">login</button>
        </form>
      </div>
    )
  }
}

export default Login