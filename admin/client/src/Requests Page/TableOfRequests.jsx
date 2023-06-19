import { CiCircleRemove, CiCircleCheck } from "react-icons/ci";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
export const TableOfRequests = () => {
  const [hotels, setHotels] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5500/admin/hotel/hotels/request")
      .then((response) => {
        setHotels(response.data);
        forceUpdate();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  const handleAccepted = (id) => {
    axios
      .put("http://localhost:5500/admin/hotel/hotels/request/accept/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Added Successfully ",
      showConfirmButton: false,
      timer: 1800,
    });
    forceUpdate();
  };

  const handleRejected = (id, name) => {
    console.log(id);
    Swal.fire({
      title: `Are you sure to reject ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been rejected `, "", "success");

        axios
          .put("http://localhost:5500/admin/hotel/hotels/request/reject/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRows = hotels.map((hotel) => {
    return (
      <tr key={hotel.hotel_id} className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {hotel.hotel_name}
        </th>
        <td className="px-4 py-3">{hotel.city}</td>
        <td className="px-4 py-3">{hotel.stars}⭐</td>
        <td className="px-4 py-3">{hotel.description}</td>
        <td className="px-4 py-3">{hotel.phonehotel}</td>
        <td className="px-4 py-3">{hotel.imagehotel ? "😊":"☕"}</td>
        <td className="px-4 py-3 flex items-center justify-end">
          <div
            id=""
            className="bg-white flex  rounded divide-y divide-gray-100 gap-2  "
          >
            <div
              className="tooltip tooltip-success text-white "
              data-tip="Accept"
            >
              <button
                onClick={() => handleAccepted(hotel.hotel_id)}
                className="btn bg-white hover:bg-green-200 shadow-lg hover:shadow-xl border-none "
              >
                <CiCircleCheck className="text-green-500 text-[20px]" />
              </button>
            </div>
            <div className="tooltip tooltip-error text-white" data-tip="Reject">
              <button
                onClick={() => handleRejected(hotel.hotel_id, hotel.hotel_name)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <CiCircleRemove className="text-red-500 text-[20px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <section className="w-full dark:bg-gray-900 mt-5 ">
      <div className="">
        <h1 className="text-[30px] font-bold py-3">Requests</h1>
        {/* Start coding here */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-zebra">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Hotel Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    city
                  </th>
                  <th scope="col" className="px-4 py-3">
                    stars
                  </th>
                  <th scope="col" className="px-4 py-3">
                    description{" "}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone Number
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
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">There Are No Requests</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
