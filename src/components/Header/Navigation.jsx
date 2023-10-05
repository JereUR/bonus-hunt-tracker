import styled from 'styled-components'

import { menuItems } from '../../utils/menuItmes'
import { logoutIcon } from '../../utils/Icons'
import { signOutFromSupabase } from '../../services'

export default function Navigation({ active, setActive }) {
  return (
    <NavStyled>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id)
            }}
            className={active === item.id ? 'btn-nav active' : 'btn-nav'}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
        <div className="btn-nav logout" onClick={() => signOutFromSupabase()}>
          <span>{logoutIcon} Cerrar Sesión</span>
        </div>
      </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  margin-top: 50px;
  margin-bottom: -30px;

  .btn-nav {
    z-index: 2;
    cursor: pointer;
  }

  .menu-items {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    line-height: 40px;
    transition: all 0.3s ease-in-out;

    .active {
      border-bottom: 3px solid var(--primary-color);
      border-radius: 7px;
    }
  }

  span {
    font-weight: bold;
    font-size: 18px;
    padding: 10px;

    .ti,
    i {
      font-size: 18px !important;
    }
  }

  .logout {
    position: relative;
    right: -100px;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--primary-color);
      transform: scale(1.05);
    }
  }
`
