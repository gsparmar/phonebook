import React from 'react';

const Person = ({ persons, newSearch }) => {
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Person;
