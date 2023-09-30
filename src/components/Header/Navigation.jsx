import styled from 'styled-components'
import PropTypes from 'prop-types'

import { menuItems } from '../../utils/menuItmes'
import { logoutIcon } from '../../utils/Icons'
import { signOutFromSupabase } from '../../services'
import { useGlobalContext } from '../../context/globalContext'

export default function Navigation({ active, setActive }) {
  const { session } = useGlobalContext()

  return (
    <NavStyled>
      <div className="menu-items">
        {menuItems.map((item) => {
          return (
            <p
              key={item.id}
              onClick={() => {
                if (session !== null && session?.session !== null)
                  setActive(item.id)
              }}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </p>
          )
        })}
      </div>
      <div className="bottom-nav">
        <p onClick={() => signOutFromSupabase()}>{logoutIcon} Cerrar Sesión</p>
      </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  display: flex;
  justify-content: space-between;
`
