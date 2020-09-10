import React from "react";
import ControlledInput from "./ControlledInput";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <ControlledInput state={newName} setState={setNewName} label="name: " />
      <ControlledInput
        state={newNumber}
        setState={setNewNumber}
        label="number: "
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
