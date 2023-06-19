import { GrRevert } from "react-icons/gr";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import DismissableModal from "../components/Modal";

export const TableOfTrash = () => {
  const [events, setEvents] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5500/deleted-events")
      .then((response) => {
        setEvents(response.data);
        forceUpdate();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleActivate = (name) => {
    Swal.fire({
      title: ` Do you want to retrev ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been retreved `, "", "success");

        axios
          .patch("http://localhost:5500/activate-event/" + name)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRowsHotels = events.map((event) => {
    return (
      <tr key={event._id} className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {event.name}
        </th>
        <td className="px-4 py-3">{event.description}</td>
        <td className="px-4 py-3">{event.locationName}</td>
        <td className="px-4 py-3">{event.numberOfTrees}</td>
        <td className="px-4 py-3">{event.treePrice}</td>
        <td className="px-4 py-3">
          <DismissableModal image={event.image} classes="h-12 w-12" />
        </td>
        <td className="px-4 py-3 flex items-center justify-end">
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip  text-white" data-tip="Revert">
              <button
                onClick={() => handleActivate(event.name)}
                className="btn bg-white hover:bg-gray-200 shadow-lg hover:shadow-xl border-none "
              >
                <GrRevert className="text-red-500 text-[15px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  //------------------------------------------------------------------------------
  const [users, setUsers] = useState([]);
  //   const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5500/deleted-users")
      .then((response) => {
        setUsers(response.data);
        forceUpdate();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRetreived = (email) => {
    console.log(email);
    Swal.fire({
      title: ` do you want to return ${email}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${email} has been retreived `, "", "success");

        axios
          .patch("http://localhost:5500/activate-user/" + email)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRowsUsers = users.map((user) => {
    return (
      <tr key={user._id} className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {user.username}
        </th>
        <td className="px-4 py-3">{user.email}</td>
        <td className="px-4 py-3">{user.password}</td>
        <td className="px-4 py-3">{user.phoneNumber}</td>
        <td className="px-4 py-3">{user.role}</td>
        <td className="px-4 py-3">{user.active ? "✔" : "❌"}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div id="" className="bg-white flex gap-2 rounded ">
            <div className="tooltip  text-white" data-tip="Retrev">
              <button
                onClick={() => handleRetreived(user.email)}
                className="btn bg-white hover:bg-gray-200 shadow-lg hover:shadow-xl border-none "
              >
                <GrRevert className="text-red-500 text-[15px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <section className="w-full  mt-9 ">
      <div className="mb-8">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">Deleted Events</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full  text-sm text-left text-gray-500 table-zebra ">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Event Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description{" "}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Max Volunteers
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Trees
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tree Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Img
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRowsHotels.length === 0 ? (
                  <div className="p-3 text-lg">There Are No Deleted Events</div>
                ) : (
                  tableRowsHotels
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-[30px] font-bold py-3">Deleted Users</h1>
        {/* Start coding here */}
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-zebra">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Active
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRowsUsers.length === 0 ? (
                  <div className="p-3 text-lg">There are no deleted users</div>
                ) : (
                  tableRowsUsers
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
