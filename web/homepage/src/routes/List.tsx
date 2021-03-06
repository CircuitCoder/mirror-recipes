import { FunctionalComponent, h, Fragment } from "preact";
import { Ctx } from '../app';
import style from './List.scss';
import clsx from 'clsx';
import { useContext } from "preact/hooks";

const NotFound: FunctionalComponent = () => {
  const { state, dispatch } = useContext(Ctx);

  return (
    <>
      <div class={style.container}>
        <div class={style.title}>List</div>
      </div>
    </>
  );
};

export default NotFound;