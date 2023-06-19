import React from "react";
import Footer from "./footer";
import  NavBar  from "./NavBar";

export default function Layout({ children, hideNav, setHideNav }) {
  return (
    <>
      <NavBar hideNav={hideNav} setHideNav={setHideNav}  />
      <main>{children}</main>
      <Footer hideNav={hideNav} />
    </>
  );
}
