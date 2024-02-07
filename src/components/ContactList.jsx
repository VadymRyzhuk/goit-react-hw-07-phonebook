import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from './redux/Contacts/contactsReducer';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(store => store.contacts.contacts.items);
  const filter = useSelector(store => store.contacts.filter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  //-----------------------------------------------------------------------------------add to local storage
  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);
  //-----------------------------------------------------------------------------------add to local storage
  // const isLoading = useSelector(store => store.contacts.contacts.isLoading);
  // const error = useSelector(store => store.contacts.contacts.error);
  // console.log(contactsItems);

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };
  return (
    <div>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id} id={contact.id}>
            {contact.name}:{contact.number}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ContactList };
