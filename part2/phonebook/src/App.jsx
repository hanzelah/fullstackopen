import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(inputValue) => setFilter(inputValue.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={(inputValue) => setNewName(inputValue.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(inputValue) => setNewNumber(inputValue.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={(inputValue) => {
          inputValue.preventDefault()
          persons.find(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) :
          setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
          setNewName('')
          setNewNumber('')
        }}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <div>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person, key) => (
            <div key={key}>{person.name} {person.number}</div>
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
    axios
      .get('http://localhost:3001/persons')
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App