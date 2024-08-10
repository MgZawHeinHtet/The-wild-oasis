import React, { createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

export function DarkModeProvider({children}) {

  const [isDarkMode,setDarkMode] = useLocalStorageState(false,'DarkMode');

  useEffect(function(){
    if(isDarkMode){
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }else{
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  },[isDarkMode])

  function toogleMode(){
    setDarkMode(!isDarkMode);
  }
  return (
    <DarkModeContext.Provider value={{isDarkMode,toogleMode}}>
        {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkModeContext(){
  const context = useContext(DarkModeContext)
  if(!context) throw new Error('The context should be called in the provider.')
  return context
}
