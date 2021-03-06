import React from 'react';

const PersonForm = ({
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
