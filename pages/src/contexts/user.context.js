import { createContext, useState, useEffect } from "react";
import { createUser } from "../utils/axios.utils";
import { OnAuthStateChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };

  const handleUserChange = async (user) => {
    const userRes = await createUser();
    console.log({ userRes });
    setCurrentUser(user);
    console.log({ user });
    if (user) {
      const userRes = await createUser();
      console.log({ userRes });
      setCurrentUser({ ...user, ...userRes.data.data });
    }
  };

  useEffect(() => {
    const unsubscribe = OnAuthStateChangedListener(handleUserChange);

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
