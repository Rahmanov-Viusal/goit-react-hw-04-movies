import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function LoaderComponent() {
  return (
    <Loader
      className={s.loader}
      type="Grid"
      color="black"
      height={80}
      width={80}
      timeout={4000}
    />
  );
}
