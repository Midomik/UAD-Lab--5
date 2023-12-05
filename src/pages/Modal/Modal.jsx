import { IconBurger } from 'components/assets/sprite';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Modal.module.css';
import { useSelector } from 'react-redux';
import { selectLastLocation } from 'redux/game/game.selectors';
import { selectAuthenticated } from 'redux/auth/auth.selectors';
import { ToastNotify } from 'components/ToastNotify/ToastNotify';

const Modal = ({ children }) => {
  const isAuth = useSelector(selectAuthenticated);
  const location = useLocation();
  const lastLocation = useSelector(selectLastLocation);
  const backLink = lastLocation?.pathname ?? '/';
  let content;

  if (location.pathname !== '/shared_layout') {
    content = (
      <Link className={css.burger_menu} to="/shared_layout">
        <IconBurger />
      </Link>
    );
  } else {
    content = (
      <Link className={css.back_link} to={backLink}>
        Go Back
      </Link>
    );
  }
  return (
    <div className={css.burger_menu_container}>
      <ToastNotify />
      {isAuth && content}

      <main>{children}</main>
    </div>
  );
};

export default Modal;
