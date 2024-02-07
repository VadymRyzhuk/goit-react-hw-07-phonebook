import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const nameValue = event.target.value.trim();
    setName(nameValue);
  };

  const handleNumber = event => {
    const numberValue = event.target.value;
    setNumber(numberValue);
  };

  const handleFilter = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const onAddClick = event => {
    event.preventDefault();

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(
        'This name is already in the phonebook. Please choose a different name.'
      );
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, newContact]);
    // this.setState(prevState => ({
    //   contacts: [...prevState.contacts, newContact],
    // }));

    event.currentTarget.reset();
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const filteredName = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        onAddClick={onAddClick}
        handleChange={handleChange}
        handleNumber={handleNumber}
      />
      <h2>Contacts</h2>
      <Filter handleFilter={handleFilter} />
      <ContactList
        contacts={filteredName}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
