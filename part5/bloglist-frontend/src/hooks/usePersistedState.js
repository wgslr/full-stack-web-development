import { useState } from "react";

export const usePersistedState = (key, initialValue) => {
  const get = () => JSON.parse(window.localStorage.getItem(key));
  const [, setValue] = useState(get());
  const update = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  if (get() === undefined) {
    window.localStorage.setItem(key, JSON.stringify(initialValue));
  }

  const setState = (updaterOrNewValue) => {
    if (typeof updaterOrNewValue === "function") {
      update(updaterOrNewValue(get()));
    } else {
      update(updaterOrNewValue);
    }
  };

  return [get(), setState];
};
