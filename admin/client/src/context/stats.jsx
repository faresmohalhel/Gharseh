import React, { createContext, useState } from "react";

// Create a new context
const NumbersContext = createContext();

// Create a custom provider component
const NumbersProvider = ({ children }) => {
  // State to hold the three numbers
  const [resortsCount, setResortsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);

  // Function to update the numbers

  // Value object to be provided by the context
  const contextValue = {
    resortsCount,
    setResortsCount,
    usersCount,
    setUsersCount,
    requestsCount,
    setRequestsCount,
  };

  return (
    <NumbersContext.Provider value={contextValue}>
      {children}
    </NumbersContext.Provider>
  );
};

export { NumbersContext, NumbersProvider };
