import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const displayNotification = (msg, timeout, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => {
      setNotification(null);
    }, timeout);
  };

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleUpdate = (personUpdate) => {
    personService
      .update(personUpdate.id, { ...personUpdate, number: newNumber })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== personUpdate.id ? person : returnedPerson
          )
        );
        displayNotification(`Updated ${returnedPerson.name}`, 5000);
      })
      .catch((error) => {
        displayNotification(
          `Information of ${personUpdate.name} has already been removed from server`,
          5000,
          true
        );
        setPersons(persons.filter((person) => person.id !== personUpdate.id));
      })
      .finally(() => {
        setNewName("");
        setNewNumber("");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        handleUpdate(existingPerson);
      }
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        displayNotification(`Added ${returnedPerson.name}`, 5000);
      })
      .catch((err) => {
        displayNotification(`failed to create new entry for ${newName}`);
      });
  };

  const handleDeletion = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name} ?`)) {
      personService
        .remove(deletedPerson.id)
        .then(
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        )
        .catch((err) => {
          displayNotification(
            `person ${deletedPerson.name} was already deleted from server`,
            5000,
            true
          );
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter {...{ filter, setFilter }} />
      <h2>add a new</h2>
      <PersonForm
        {...{
          newName,
          setNewName,
          newNumber,
          setNewNumber,
          handleSubmit,
        }}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;
