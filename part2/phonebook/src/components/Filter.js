import React from "react";
import ControlledInput from "./ControlledInput";

const Filter = ({ filter, setFilter }) => {
  return (
    <ControlledInput
      state={filter}
      setState={setFilter}
      label="filter shown with "
    />
  );
};

export default Filter;
