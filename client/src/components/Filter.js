import { useState } from 'react'

const Filter = ({ persons, setPersonsToDisplay }) => {
  const [newSearch, setNewSearch] = useState('');
  
  const handleNewSearch = event => {
    const search = event.target.value;
  
    setNewSearch(search);
  
    setPersonsToDisplay(persons.filter(person => {
      const regexp = new RegExp(`^${search}`, 'i');
      return person.name.match(regexp);
    }));  
  }

  return (
    <>search: <input onChange={handleNewSearch} value={newSearch} /></>
  );
}

export default Filter;