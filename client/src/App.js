import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'

import phonebookService from './services/phonebook.js';

const safelyRemoveAtIndex = (persons, removeAt) => (
  persons
  .slice(0, removeAt)
  .concat(persons
    .slice(removeAt + 1))
);

const safelyAddAtIndex = (persons, newPerson, insertAt) => (
  persons
  .slice(0, insertAt)
  .concat(newPerson)
  .concat(persons
    .slice(insertAt))
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsToDisplay, setPersonsToDisplay] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(true);

  useEffect(() => {
    phonebookService.getPersons().then(initialPersons => {
      setPersons(initialPersons);
      setPersonsToDisplay(initialPersons);
    });
  }, []);

  const handleNewName = event => {
    setNewName(event.target.value);
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const inPhonebook = persons.find(person => person.name === newName);

    if (inPhonebook) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        phonebookService.updatePerson(
          inPhonebook.id, 
          newPerson
        ).then(updatedPerson => {
          const replaceAt = persons.findIndex(person => (
            person.id === inPhonebook.id
          ));
  
          const removed = safelyRemoveAtIndex(persons, replaceAt);
          const newPersons = safelyAddAtIndex(
            removed,
            updatedPerson,
            replaceAt
          );
  
          setPersons(newPersons);
          setPersonsToDisplay(newPersons);

          setNotificationMessage(`${newName} was updated.`);
          setTimeout(() => setNotificationMessage(null), 3000);
        }).catch(error => {
          setSuccessStatus(false);
          setNotificationMessage(error.response.data.error);

          setTimeout(() => {
            setSuccessStatus(true);
            setNotificationMessage(null);
          }, 3000);
        });
      }
    } else { 
      phonebookService.addPerson(newPerson)
        .then(addedPerson => {
          const newPersons = persons.concat(addedPerson);
          setPersons(newPersons);
          setPersonsToDisplay(newPersons);

          setNotificationMessage(`${newName} was added.`);
          setTimeout(() => setNotificationMessage(null), 3000);
        })
        .catch(error => {
          setSuccessStatus(false);
          setNotificationMessage(error.response.data.error);
          
          setTimeout(() => {
            setSuccessStatus(true);
            setNotificationMessage(null);
          }, 3000);
        });
    }
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService.deletePerson(id)
      .then(() => {
        const deleteAt = persons.findIndex(person => person.id === id);
        const newPersons = safelyRemoveAtIndex(persons, deleteAt);
  
        setPersons(newPersons);
        setPersonsToDisplay(newPersons);
      });
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} successStatus={successStatus} />
      <Filter persons={persons} setPersonsToDisplay={setPersonsToDisplay} />
      <h2>Add new contact</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        personsToDisplay={personsToDisplay}
        deleteHandler={deletePerson}
      />
    </div>
  )
}

export default App;