import css from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout/SharedLayout';
import { ContactsPage } from 'pages/ContactsPage/ContactsPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateThunk } from 'redux/auth/auth.reducer';

import * as ROUTES from 'constants/routes';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { GamePage } from 'pages/GamePage/GamePage';

import Modal from 'pages/Modal/Modal';
import GameResult from 'pages/GameResult/GameResult';

const appRoutes = [
  {
    path: ROUTES.CONTACT_ROUTE,
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.GAME_ROUTE,
    element: (
      <PrivateRoute>
        <GamePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.SHARED_LAYOUT,
    element: (
      <PrivateRoute>
        <SharedLayout />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.GAME_RESULTS,
    element: (
      <PrivateRoute>
        <GameResult />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.LOGIN_ROUTE,
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    element: (
      <RestrictedRoute>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
];

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateThunk());
  }, [dispatch]);

  return (
    <div id="main_container" className="app_main_container">
      <Modal>
        <div className={css.container}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            <Route
              path="*"
              element={
                <PrivateRoute>
                  <LoginPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Modal>
    </div>
  );
};
