import PropTypes from 'prop-types';
import './Section.css';

const Section = ({ title, children }) => {
  return (
    <section>
      <h1 className="title">{title}</h1>
      {children}
    </section>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
