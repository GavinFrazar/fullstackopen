import React from "react";

const Numbers = ({ persons, handleDeletion }) => {
  return persons.map((person) => (
    <Person
      person={person}
      key={person.name}
      handleDeletion={() => handleDeletion(person)}
    />
  ));
};

const Person = ({ person, handleDeletion }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeletion}>delete</button>
    </div>
  );
};

export default Numbers;
