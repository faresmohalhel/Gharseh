import React, { useContext, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

import { AuthContext } from "../Context/AuthContext";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Profile from "../components/Profile/Profile";

export default function NavBar({hideNav, setHideNav}) {
  const { auth, setAuth } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center text-lg font-bold">
          الرئيسية
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/Services" className="flex items-center text-lg font-bold">
          الفعاليات
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/About" className="flex items-center text-lg font-bold">
          قصتنا
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/Contact" className="flex items-center text-lg font-bold">
          اتصل بنا
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
   { !hideNav &&   <Navbar
        className="inset-0 z-10 h-max max-w-full rounded-none py-2 px-4"
        dir="rtl"
      >
        <div className="flex items-center lg:justify-between md:justify-between justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="cursor-pointer font-medium">
            <img src={logo} alt="logo" className="h-auto w-14" />
          </Typography>
          <div className="flex items-end gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {auth === true ? (
              <Profile setHideNav={setHideNav} />
            ) : (
              <Link to="/Login">
                <Button
                  variant="gradient"
                  size="sm"
                  color="green"
                  className="hidden lg:inline-block bg-green-500"
                >
                  <span>تسجيل دخول</span>
                </Button>
              </Link>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <div className="lg:block hidden" width="15px"></div>
        </div>

        <Collapse open={openNav}>
          {navList}
          <Button
            variant="gradient"
            color="green"
            size="sm"
            fullWidth
            className="bg-green-500 mb-2"
          >
            <span>تسجيل دخول</span>
          </Button>
        </Collapse>
      </Navbar>}
    </>
  );
}
