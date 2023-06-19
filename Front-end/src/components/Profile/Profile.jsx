import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Profile = ({setHideNav}) => {
  const { setAuth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
  };

  return (
    <>
      {/* Dropdown menu */}
      {
        <Menu>
          <MenuHandler>
            <Avatar
              variant="circular"
              alt="candice wu"
              className="cursor-pointer w-10 h-10"
              src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-24.jpg"
            />
          </MenuHandler>
          <MenuList dir="rtl">
            <MenuItem className="flex items-center gap-2">
              <UserCircleIcon
                strokeWidth={2}
                color="green"
                className="h-5 w-5"
              />
              <Link to={`/userprofile/${user._id}`} onClick={()=> setHideNav(true)}>
                <Typography variant="small" className="text-black font-bold">
                  صفحتي
                </Typography>
              </Link>
            </MenuItem>
            <hr className="my-2 border-blue-gray-50" />
            <MenuItem className="flex items-center gap-2 ">
              <PowerIcon strokeWidth={2} color="red" className="h-4 w-4" />
              <Typography variant="small" className="font-bold">
                <Link
                  variant="gradient"
                  color="green"
                  size="sm"
                  fullWidth
                  className="text-black mb-2"
                  onClick={handleLogout}
                >
                  <span>تسجيل خروج</span>
                </Link>
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      }
    </>
  );
};

export default Profile;
