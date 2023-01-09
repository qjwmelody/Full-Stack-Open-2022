import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookService from './services/phonebook'

const Person = ({personToShow, setPersons}) => {
  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      phoneBookService.deleteData(person.id).then(setPersons(personToShow.filter(item => item.id !== person.id)))
    }
  }
  return(
    <div>
        {personToShow.map(value =>
          <div key={value.name}>{value.name} {value.number} <button onClick={() => handleDelete(value)}>delete</button></div>
        )}
    </div>
  )
}

const Filter = ({newSearch, handleNewSearch}) => {
  return(
    <div>
        filter shown with <input value={newSearch} onChange={handleNewSearch}/>
    </div>
  )
}

const ShowMessage = ({nameMessage, numberMessage, errorMessage}) => {
  if (numberMessage == null && nameMessage == null){
    return null
  }else if(numberMessage != null && nameMessage == null){ 
    if (errorMessage != null){
      return null
    }else{
      return(<div className="info">{numberMessage}</div>)}
  }else if(numberMessage == null && nameMessage != null){
    return( <div className="info">{nameMessage}</div>)
  }else{
    return(
      <div>
        <div className="info">{numberMessage}</div>
        <div className="info">{nameMessage}</div>
      </div>
    )
  }
}

const ShowError = ({errorMessage}) => {
  if(errorMessage === null){
    return null
  }else{
    return (<div className="error">{errorMessage}</div>)
  }
}

const PersonForm = ({addPerson, newName, newNumber, handleNumberChange, handlePersonChange}) => {
  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/><br></br>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newSearch, setNewSearch ] = useState("")
  const [ newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ nameMessage, setNameMessage] = useState(null)
  const [ numberMessage, setNumberMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }
  const personToShow = (newSearch == "") ? persons : persons.filter(value => value.name.toLowerCase().includes(newSearch.toLowerCase()))

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    let flag = false
    let updateID = 0
    let updatePerson = ""
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.forEach(value => {
      if(value.name.toLowerCase() === newName.toLocaleLowerCase()){
        flag = true
        updateID = value.id
        updatePerson = value.name
      }
    })
    if(flag) {
      if (window.confirm(`${updatePerson} is already added to phonebook, replace the old number with a new one ?`)){
        phoneBookService.updateData({...personObject, name: updatePerson}, updateID).then(response => {
          setPersons(persons.map(value => value.id !== updateID ? value : {...response.data, name: updatePerson}))
        }).catch(error => {
          setErrorMessage(`Information of ${updatePerson} has already been removed from server`)
          setPersons(persons.filter(item => item.id !== updateID))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        setNumberMessage(`${updatePerson}'s number has been changed`)
        setTimeout(() => {
          setNumberMessage(null)
        }, 5000)
        setNewName('')
       setNewNumber('')
      }
    }
    else{
      phoneBookService.sendData(personObject).then(response => setPersons(persons.concat(response.data)))
      setNameMessage(`Added ${newName}`)
      setTimeout(() => {
        setNameMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ShowError errorMessage={errorMessage}/>
      <ShowMessage nameMessage={nameMessage} numberMessage={numberMessage} errorMessage={errorMessage}/>
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
      <h3>Numbers</h3>
      <Person personToShow={personToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App