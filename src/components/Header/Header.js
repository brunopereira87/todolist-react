import React from 'react'
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/to-do-list.svg';
import { UserContext } from '../../UserContext';
import styles from './Header.module.css';
const Header = () => {

  const { data, userLogout } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <div className={styles.left}>
          <h1 className={styles.logo}>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </h1>
          {data && (
            <div className={styles.leftNav}>
              <NavLink to="/tarefas">Tarefas</NavLink>
              <NavLink to="/categorias">Categorias</NavLink>
            </div>
          )}
        </div>

        <div className="navright">
          {data ? (
            <div className={styles.loggedin}>
              <NavLink className={styles.right} to="conta">{data.displayName}</NavLink>
              <button className="btn-link" style={{ fontSize: ".9rem" }} onClick={userLogout}>Sair</button>
            </div>
          ) : (
              <>
                <NavLink className={styles.right} to="login">Login</NavLink>
                <NavLink className={styles.right} to="cadastrar">Cadastrar</NavLink>
              </>
            )}

        </div>

      </nav>
    </header>
  )
}

export default Header
