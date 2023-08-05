import { createContext, useContext } from "react";
import { Firebase } from "../services/firebase";

const FirebaseContext = createContext()
export const FirebaseContextProvider = ({ children }) => {
    const firebase = new Firebase()
    return <FirebaseContext.Provider value={{firebase}}>
        {children}
    </FirebaseContext.Provider>
}
export const useFirebaseContext = () => {
    const context = useContext(FirebaseContext)
    if (context === undefined) {
    throw new Error("FirebaseContext was used outside of the FirebaseProvider");
    }
    return context
}