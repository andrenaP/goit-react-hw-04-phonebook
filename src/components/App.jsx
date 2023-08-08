import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './Filter';

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const App = () => {
  const [contacts, setcontacts] = useState([]);
  const [filter, setfilter] = useState('');

  useDidMountEffect(ContactsCheck, [contacts]);
  function ContactsCheck() {
    //setItem
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  useEffect(() => {
    //getItem
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setcontacts(parsedContacts);
    }
  }, []);

  const handleChangeFilter = e => {
    setfilter(e.target.value);
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

    setcontacts(c => [...c, contactDataWithId]);
  };

  const deleteContact = id => {
    const filted = contacts.filter(contact => contact.id !== id);
    // if (filted.length === 0) ClearContact();
    setcontacts(filted);
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
