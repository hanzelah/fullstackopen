import { useState } from 'react'

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
      <div>
        filter shown with <input value={filter} onChange={(inputValue) => setFilter(inputValue.target.value)} />
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person, key) => (
            <div key={key}>{person.name} {person.number}</div>
          ))}
    </div>
  )
}

export default App