import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import './App.css';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log('success!');
      setPersons(initialPersons);
    });
  }, []);

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null;
    }
    return <div className={type}>{message}</div>;
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson)
      window.confirm(
        `${newName} is already in the phonebook, would you like to update the number?`
      ) &&
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
          });
    else {
      personService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setType('addContact');
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={type} />

      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>add a new contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Person persons={persons} newSearch={newSearch} setPersons={setPersons} />
    </div>
  );
};

export default App;
