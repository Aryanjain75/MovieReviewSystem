
// Context interface to define shared data structure
interface userDetails {
  name:string;
  email:string;
}

import axios from 'axios';
// Create React context with initial values
import React, { createContext,useState,useContext } from 'react';

interface ContextProps {
  username: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
  getUserDetails: () => Promise<void>;
  userDetails: userDetails | undefined;
  setUserDetails: React.Dispatch<React.SetStateAction<userDetails | undefined>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);
export const ContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userDetails, setUserDetails] = useState<userDetails|undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    async function getUserDetails(){
          try {
            const token=localStorage.getItem("authToken"    );// Pass token in body
            const response = await axios.get(`https://movieapi-rook.onrender.com/auth/getDetails?token=${token}`);
            if (response.status === 200) {
                setUserDetails(response.data.data);
                console.log(userDetails)
              setUsername(response.data.data.name); // Assuming the API returns `{ username: '...' }`
              setIsAuthenticated(true);
            }
            console.log(userDetails);

          } catch (error) {
            console.error("Failed to fetch user details", error);
            setIsAuthenticated(false);
          }
          console.log(userDetails);
    }

    return (
        <Context.Provider value={{username,setIsAuthenticated,setUsername,isAuthenticated, getUserDetails,userDetails, setUserDetails }}>
            {children}
        </Context.Provider>
    );
};
export const useUserContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
  };