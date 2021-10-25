import React from 'react';
import personServices from '../services/persons';
import '../App.css';

const Person = ({ persons, newSearch, setPersons }) => {
  return (
    <div>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newSearch.toLowerCase())
          )
          .map((person) => (
            <li>
              {person.name} {person.number}
              <button
                onClick={() => {
                  console.log('button clicked');
                  window.confirm(`Delete ${person.name}?`) &&
                    personServices.remove(person.id);
                  setPersons(persons.filter((n) => n.id !== person.id));
                }}
              >
                delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Person;
