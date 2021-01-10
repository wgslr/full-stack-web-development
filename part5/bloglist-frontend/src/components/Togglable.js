import React, { useState } from "react";
import { useImperativeHandle } from "react";

const Togglable = React.forwardRef(({ name, children }, ref) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((p) => !p);

  useImperativeHandle(ref, () => ({ toggle }));

  return (
    <div>
      <button onClick={toggle}>{name ?? "Show"}</button>
      {show && children}
    </div>
  );
});

export default Togglable;
