import React from 'react';
import css from './RegisterPage.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/auth/auth.reducer';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const handlerSubmit = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const userData = { name, email, password };
    dispatch(registerThunk(userData));
  };
  return (
    <>
      {' '}
      <p className={css.register_title}>Register</p>
      <form onSubmit={handlerSubmit} className={css.login_form}>
        <label>
          <p className={css.title_item}>Name:</p>
          <input
            className={css.name_input}
            type="text"
            required
            placeholder="Alex Brown"
            name="userName"
          />
        </label>
        <label>
          <p className={css.title_item}>Email:</p>
          <input
            className={css.name_input}
            type="email"
            required
            placeholder="abc@gmail.com"
            name="userEmail"
          />
        </label>
        <label>
          <p className={css.title_item}>Password:</p>
          <input
            className={css.name_input}
            type="password"
            required
            placeholder="*******"
            name="userPassword"
            minLength={7}
          />
        </label>
        <br />
        <br />
        <button className={css.sub_btn} type="submit">
          Sign Up
        </button>
        <div className={css.auth_container}>
          <Link className={css.login_link} to="/login">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};
