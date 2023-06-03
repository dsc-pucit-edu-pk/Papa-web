import { getAuthStatusApi } from "../ApiCalls/GetAuthStatus";
import { createContext, useEffect, useState } from "react";
type GlobalData = {
  userId: string;
  username: string;
  loggedIn: boolean;
  authLoading: boolean;
};
type ContextState =
  | { globalData: GlobalData } & {
      setAuthData: (data: Omit<GlobalData, "authLoading">) => void;
    };
const initialState: GlobalData = {
  username: "",
  userId: "",
  loggedIn: false,
  authLoading: true,
};
export const globalContext = createContext<ContextState>({
  globalData: { ...initialState },
  setAuthData: (arg) => {},
});

function GlobalContext({ children }: { children: React.ReactNode }) {
  const [globalData, setGlobalData] = useState<GlobalData>(initialState);
  const setAuthData = (data: Omit<GlobalData, "authLoading">) => {
    setGlobalData((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    getAuthStatusApi()
      .then((data) => {
        setGlobalData({
          userId: data.userId,
          username: data.username,
          loggedIn: true,
          authLoading: false,
        });
      })
      .catch(() => {
        setGlobalData({
          ...initialState,
          authLoading: false,
        });
      });
  }, []);
  if (globalData.authLoading)
    return (
      <globalContext.Provider value={{ globalData, setAuthData }}>
        <p>loading...</p>
      </globalContext.Provider>
    );
  return (
    <globalContext.Provider value={{ globalData, setAuthData }}>
      {children}
    </globalContext.Provider>
  );
}
export default GlobalContext;
