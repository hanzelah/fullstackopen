import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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