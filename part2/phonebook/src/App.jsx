import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebookService'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(inputValue) => setFilter(inputValue.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService.update(existingPerson.id, { name: newName, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person))
            alert(`Person ${newName} updated.`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('There was an error!', error)
          })
      }
    } else {
      phonebookService.create({ name: newName, number: newNumber })
        .then(response => {
          setPersons(persons.concat(response.data))
          alert(`Added ${response.data.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(inputValue) => setNewName(inputValue.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(inputValue) => setNewNumber(inputValue.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter, setPersons }) => {
  return (
    <div>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person, key) => (
            <div key={key}>{person.name} {person.number} <button onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                phonebookService.remove(person.id)
                  .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                  })
                  .catch(error => {
                    console.error('There was an error!', error)
                  })
              }
            }}>delete</button></div>
          ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    phonebookService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App