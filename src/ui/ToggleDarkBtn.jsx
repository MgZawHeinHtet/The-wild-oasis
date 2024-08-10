import React from 'react'
import ButtonIcon from "../ui/ButtonIcon"
import { HiMoon } from 'react-icons/hi'
import { useDarkModeContext } from '../context/DarkModeContext'
import { HiSun } from 'react-icons/hi2'

function ToggleDarkBtn() {
  const {isDarkMode,toogleMode} = useDarkModeContext()
  
  return (
    <ButtonIcon onClick={toogleMode}>
        {!isDarkMode ? <HiSun/>:<HiMoon/>}
    </ButtonIcon>
  )
}

export default ToggleDarkBtn