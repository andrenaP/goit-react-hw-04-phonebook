import PropTypes from 'prop-types';

import './Filter.css';
import ContactAnyInput from '../ContactAnyInput';

const Filter = ({ handleChange }) => {
  return (
    <ContactAnyInput
      LableText="Find contacts by name"
      type="text"
      name="filter"
      handleChange={handleChange}
    />
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
