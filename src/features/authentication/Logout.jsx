import React from 'react'
import ButtonIcon from "../../ui/ButtonIcon"
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useSignout } from './useSignout'
import SpinnerMini from '../../ui/SpinnerMini'

function Logout() {
    const {signout,isPending} = useSignout()
    function handleClick(){
        signout()
    }
  return (
    <ButtonIcon disabled={isPending} onClick={handleClick}>
        {!isPending ? <HiArrowRightOnRectangle/> : <SpinnerMini/>}
    </ButtonIcon>
  )
}

export default Logout