import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './Filter';

export const App = () => {
  const [contacts, setcontacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setfilter] = useState('');
  const IsFirstRender = useRef(true);

  useEffect(() => {
    if (IsFirstRender.current) {
      IsFirstRender.current = false;
      return;
    }
    //setItem
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = event => {
    setfilter(event.target.value);
  };

  const handleSubmit = contactData => {
    const { name } = contactData;

    const filterFind = contacts.find(
      element => element.name.toLowerCase() === name.toLowerCase()
    );

    if (filterFind) {
      window.alert(`Name: ${name} is already in contacts`);
      return 0;
    }

    const contactDataWithId = { ...contactData, id: nanoid() };

    setcontacts(Lastcontacts => [...Lastcontacts, contactDataWithId]);
  };

  const deleteContact = id => {
    //const filted = contacts.filter(contact => contact.id !== id);
    // if (filted.length === 0) ClearContact();
    setcontacts(contactLast =>
      contactLast.filter(contact => contact.id !== id)
    );
  };
  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={handleSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter handleChange={handleChangeFilter} />
        <ContactList contacts={visibleContacts()} deleteFunc={deleteContact} />
      </Section>
    </div>
  );
};

export default App;
