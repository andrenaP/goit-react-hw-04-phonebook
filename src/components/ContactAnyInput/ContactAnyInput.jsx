import PropTypes from 'prop-types';
import './ContactAnyInput.css';

const ContactAnyInput = ({
  type,
  name,
  pattern,
  title,
  handleChange,
  LableText,
}) => {
  return (
    <label htmlFor={name} className="ContactAnyInputLabel">
      {LableText}
      <input
        type={type}
        name={name}
        pattern={pattern}
        title={title}
        required
        onChange={handleChange}
      ></input>
    </label>
  );
};

export default ContactAnyInput;

ContactAnyInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  LableText: PropTypes.string,
};
