import React, { createContext, useContext, useState } from "react";

interface RaioContextData {
  raio: number;
  setRaio: (raio: number) => void;
}

const RaioContext = createContext<RaioContextData>({} as RaioContextData);

export function RaioProvider({ children }: { children: React.ReactNode }) {
  const [raio, setRaio] = useState(50); // valor padrão desta frustração encarnada em codigo

  return (
    <RaioContext.Provider value={{ raio, setRaio }}>
      {children}
    </RaioContext.Provider>
  );
}

export function useRaio() {
  const context = useContext(RaioContext);
  if (!context) {
    throw new Error("useRaio must be used within a RaioProvider");
  }
  return context;
}
