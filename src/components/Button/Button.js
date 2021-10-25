import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ title, func, type }) {
  return (
    <button onClick={func} className={s.button} type={type}>
      {title}
    </button>
  );
}
Button.propTypes = {
  title: PropTypes.string.isRequired,
  func: PropTypes.func,
  type: PropTypes.string.isRequired,
};
