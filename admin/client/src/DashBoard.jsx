/* eslint-disable react/prop-types */
import { Nav } from "./Nav";
import { Aside } from "./Aside";
import { Main } from "./Main Page/Main";

export const DashBoard = (props) => {
  return (
    <>
      <div className="antialiased">
        <Nav />

        <Aside forceUpdate={props.forceUpdate}/>

        <Main />
      </div>
    </>
  );
};
