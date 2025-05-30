// style context is used to provide the style context to the app for the ability to change the style of the app
// import createContext and useContext from react to leverage the context API
import { createContext, useContext } from "react";

// export the StyleContext function to be used in the app
export const StyleContext = createContext();

// export the StyleProvider function to consume the StyleContext function (context) 
export const useStyle = () => useContext(StyleContext);