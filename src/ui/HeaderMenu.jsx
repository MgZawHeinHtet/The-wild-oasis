import React from 'react'
import { HiOutlineUser } from 'react-icons/hi'
import styled from 'styled-components'

import ButtonIcon from "../ui/ButtonIcon"
import { useNavigate } from 'react-router-dom'
import Logout from '../features/authentication/Logout'
import ToggleDarkBtn from './ToggleDarkBtn'

const StyledHeaderMenu = styled.div`
    display : flex;
    gap : 0.4rem;
    list-style : none
`

function HeaderMenu() {
const navigate = useNavigate()
  return (
    <StyledHeaderMenu>
        <li>
            <Logout/>
        </li>
        <li>
            <ToggleDarkBtn/>
        </li>
        <li>
            <ButtonIcon onClick={()=> navigate("/account")}>
                <HiOutlineUser/>
            </ButtonIcon>
        </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu