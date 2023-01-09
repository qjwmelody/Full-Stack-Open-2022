import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 24,
    borderStyle: 'solid',
    bordeRadius: 5,
    padding: 10,
    margin: 5
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 24,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  }

  if (successMessage){
    return (
      <div id='success' style={successStyle}>
        {successMessage}
      </div>
    )
  } else if (errorMessage){
    return (
      <div id='error' style={errorStyle}>
        {errorMessage}
      </div>
    )
  } else{
    return(
      <div></div>
    )
  }
}

export default Notification