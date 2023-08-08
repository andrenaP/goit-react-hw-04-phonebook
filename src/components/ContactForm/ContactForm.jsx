import { useState } from 'react';
import './ContactForm.css';
import ContactAnyInput from '../ContactAnyInput';

export default function ContactForm({ onSubmit }) {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');

  const handleChange = (event, SetFunction) => {
    SetFunction(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name: name, number: number });
    reset();
    event.target.reset();
  };

  const reset = () => {
    setname('');
    setnumber('');
  };

  return (
    <form action="" className="MainForm" onSubmit={handleSubmit}>
      <ContactAnyInput
        LableText="name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+((['-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        handleChange={event => handleChange(event, setname)}
      />
      <ContactAnyInput
        LableText="number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        handleChange={event => handleChange(event, setnumber)}
      />

      <button type="submit">Add contact</button>
    </form>
  );
}
