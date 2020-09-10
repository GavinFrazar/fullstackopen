import React from "react";

const ControlledInput = ({ state, setState, label }) => {
  return (
    <div>
      {label}
      <input onChange={(e) => setState(e.target.value)} value={state} />
    </div>
  );
};

export default ControlledInput;
