import { createContext, useContext, useMemo, useState } from "react";

export const TokenContext = createContext<any>({
  token: "",
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const handleToken = (token: string) => setToken(token);

  const values = useMemo(() => {
    return { token, handleToken };
  }, [token, handleToken]);
  return (
    <TokenContext.Provider value={values}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
