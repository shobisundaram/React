import {useState} from 'react';

function LocalStorage(key, initialValue) {
  

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // const item = window.localStorage.getItem(key);
      // return item ? JSON.parse(item) : initialValue;
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    
      if (typeof window !== "undefined") {
        var item = JSON.parse(window.localStorage.getItem(key))||[];
    
        item.push((valueToStore));
        console.log(item);
         window.localStorage.setItem(key, JSON.stringify(item));
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
export default LocalStorage ;


