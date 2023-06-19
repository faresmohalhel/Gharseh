import { SiHotelsdotcom } from "react-icons/si";
import { MdLocalHotel, MdEvent, MdEventAvailable } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { CiInboxIn } from "react-icons/ci";
import { BsFillTrashFill, BsFillTreeFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";

export const Stats = () => {
  const [events, setEvents] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  // get total of events
  useEffect(() => {
    axios
      .get("http://localhost:5500/total-events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get total of rooms
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/admin/rooms/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // total of users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/total-users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // total of requests
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/admin/hotel/hotels/request")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // total of trashed hotels
  const [trashHotels, setTrashHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/admin/hotel/hotels/retrev")
      .then((response) => {
        setTrashHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // total of trashed users
  const [trashUsers, setTrashUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5500/admin/users/users/retreived")
      .then((response) => {
        setTrashUsers(response.data);
        forceUpdate();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      className="stats shadow stats-vertical xl:stats-horizontal md:stats-horizontal bg-[#5AA1C2]"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1559717642-b96cbea7bf56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80")',
      }}
    >
      <div className="stat">
        <div className="stat-figure text-[#eee]">
          <MdEvent className="text-[40px]" />
        </div>
        <div className="stat-title  text-[#eee] font-bold">Total Events</div>
        <div className="stat-value text-white">{events.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure  text-[#eee]">
          <BsFillTreeFill className="text-[40px]" />
        </div>
        <div className="stat-title  text-[#eee] font-bold">Total Trees</div>
        <div className="stat-value text-white">{rooms.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure  text-[#eee] ">
          <FiUsers className="text-[40px] " />
        </div>
        <div className="stat-title  text-[#eee] font-bold">Total Users</div>
        <div className="stat-value text-white">{users.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure  text-[#eee] ">
          <FaMoneyBill className="text-[40px] " />
        </div>
        <div className="stat-title  text-[#eee] font-bold">Total Payments</div>
        <div className="stat-value text-white">{requests.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure  text-[#eee] ">
          <MdEventAvailable className="text-[30px] " />
        </div>
        <div className="stat-title  text-[#eee] font-bold">Total Finished</div>
        <div className="stat-value text-white">
          {trashHotels.length + trashUsers.length}
        </div>
      </div>
    </div>
  );
};
