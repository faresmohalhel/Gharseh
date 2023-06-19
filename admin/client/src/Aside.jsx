/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { SiHotelsdotcom, SiCircle } from "react-icons/si";
import { MdLocalHotel } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { CiInboxIn } from "react-icons/ci";
import { AiFillMessage } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { MdEvent, MdEventAvailable } from "react-icons/md";

import { useEffect, useState, useReducer } from "react";
// import axios from "axios";

export const Aside = (props) => {
  // const [hotels, setHotels] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.clear();
    props.forceUpdate();
  }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5500/admin/hotel/hotels/request")
  //     .then((response) => {
  //       setHotels(response.data);
  //       forceUpdate();
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [reducer]);

  // const count = hotels.length;

  return (
    <aside
      className="fixed top-0 left-0 z-50 w-64  h-screen pt-[52px] pb-1 transition-transform -translate-x-full  md:translate-x-0  "
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-[#222] ">
        <ul className="space-y-2">
          <li>
            <Link
              to="main"
              className="flex items-center p-2 text-base font-medium text-white rounded-lg  hover:bg-[#8fa165] hover:text-black "
            >
              {/* <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-60 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg> */}
              <SiCircle />
              <span className="ml-3">Overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/hotels"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <MdEvent />
              Events
            </Link>
          </li>
          {/* <li>
            <Link
              to="/rooms"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black "
            >
              <MdLocalHotel />
              Rooms
            </Link>
          </li> */}
          <li>
            <Link
              to="/users"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black "
            >
              <FiUsers />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/Message"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black "
            >
              <AiFillMessage />
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/trash"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black "
            >
              <BsFillTrashFill />
              Trash
            </Link>
          </li>
          {/* <li>
            <Link
              to="/requests"
              className="flex items-center p-2 text-base font-medium text-white  rounded-lg dark:text-white hover:bg-[#8fa165] hover:text-black  group"
            >
              <CiInboxIn />
              <span className="flex-1 ml-3 whitespace-nowrap">Requests</span>
              {count !== 0 && (
                <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-white bg-black">
                  {count}
                </span>
              )}
            </Link>
          </li> */}
          <li>
            <Link
              to="/add-event"
              className="flex items-center gap-2 p-2  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black "
            >
              <MdEventAvailable />
              Add event
            </Link>
          </li>
          <a href="/" onClick={handleLogOut}>
            <span className="flex items-center gap-2 p-2 cursor-pointer  w-full text-base font-medium text-white  rounded-lg transition duration-75 group hover:bg-[#8fa165] hover:text-black ">
              <FiLogOut />
              Logout
            </span>
          </a>
        </ul>
      </div>
    </aside>
  );
};
