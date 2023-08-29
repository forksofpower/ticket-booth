import React from "react";

import { User } from "@/types/user";

interface CurrentUserContextData {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const CurrentUserContext = React.createContext<
  CurrentUserContextData | undefined
>(undefined);

interface CurrentUserProviderProps {
  children: React.ReactNode;
  currentUser: User | null;
}

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
  currentUser: initialCurrentUser,
}) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(
    initialCurrentUser
  );
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;

export const useCurrentUser = () => {
  const context = React.useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentUser hook must be used within a CurrentUserProvider"
    );
  }
  return context;
};
