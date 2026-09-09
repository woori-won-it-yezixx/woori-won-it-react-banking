import { createContext, useContext } from "react";

const StatusContext = createContext(null);

export function StatusProvider({ status, children }) {
  return (
    <StatusContext.Provider value={status}>{children}</StatusContext.Provider>
  );
}

export function useStatus() {
  return useContext(StatusContext);
}
