import PropTypes from 'prop-types';
import './ContactList.css';

const ContactList = ({ contacts, deleteFunc }) => {
  return (
    <ul className="ListOfNames">
      {contacts.map(({ name, number, id }) => {
        return (
          <li key={id}>
            <span className="name">{name}</span>
            <span className="number">{number}</span>
            <button
              onClick={() => {
                deleteFunc(id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired),
  deleteFunc: PropTypes.func.isRequired,
};
