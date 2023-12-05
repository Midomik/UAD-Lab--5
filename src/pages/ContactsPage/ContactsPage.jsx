import { ContactList } from 'components/ContactList/ContactList';
import css from './ContactsPage.module.css';
import { SearchContact } from 'components/SearchContact/SearchContact';
import { Form } from 'components/Form/Form';

import { Loader } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { mainContacts } from 'redux/contacts/contacts.selectors';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setLastLocation } from 'redux/game/game.reducer';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setLastLocation(location));
  }, [dispatch, location]);

  const isLoader = useSelector(mainContacts).isLoading;
  return (
    <div className={css.main_container}>
      <h2 className={css.recently_list_title}>Phonebook</h2>
      <div className={css.control_element_container}>
        <SearchContact />
        <Form />
      </div>
      {isLoader && <Loader />}
      <ContactList />
    </div>
  );
};
