import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = contactData => {
    const { contacts } = this.state;
    const { name } = contactData;

    const filterFind = contacts.find(
      element => element.name.toLowerCase() === name.toLowerCase()
    );

    if (filterFind) {
      window.alert(`Name: ${name} is already in contacts`);
      return 0;
    }

    const contactDataWithId = { ...contactData, id: nanoid() };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contactDataWithId],
    }));

    // e.target.reset();
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter handleChange={this.handleChange} />
          <ContactList
            contacts={this.visibleContacts()}
            deleteFunc={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
