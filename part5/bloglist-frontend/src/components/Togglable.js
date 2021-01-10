import React, { useState } from "react";

const Togglable = React.forwardRef(({ name, children }, ref) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((p) => !p);

  return (
    <div>
      <button onClick={toggle}>{name ?? "Show"}</button>
      {show && children}
    </div>
  );
});

export default Togglable;
