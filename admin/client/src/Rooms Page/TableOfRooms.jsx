
import { useEffect , useState } from "react";
import axios from "axios";

export const TableOfRooms = () => {
const [rooms , setRooms] = useState([]);
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


  const tableRows = rooms.map((room) =>(
    <tr key={room.room_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {room.number_of_room}
      </th>

      <td>{room.room_type}</td>
      <td>{room.price}</td>
      <td>{room.number_of_beds}</td>
      <td>{room.floor_area}</td>
      <td>{room.number_of_guests}</td>
      <td>{room.room_img ? "😁" : "⛔"}</td>
      <td>{room.is_available ? '🟢' : '🔴'}</td>

    </tr>
  ))
return (
   <div className="mt-6">
    <h1 className="text-[30px] font-bold mb-3">Rooms</h1>
    <div className="relative overflow-x-auto rounded-2xl shadow-md">
        
      <table className="w-full text-sm text-left text-gray-500 table-zebra  ">
        <thead className="text-xs text-white uppercase bg-[#222] ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Room No
            </th>
            <th scope="col" className="px-6 py-3">
              Room type
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Beds
            </th>
            <th scope="col" className="px-6 py-3">
              Floor
            </th>
            <th scope="col" className="px-6 py-3">
              Guests
            </th>
            <th scope="col" className="px-6 py-3">
              img
            </th>
         
            <th scope="col" className="px-6 py-3">
              is_available
            </th>
            
          </tr>
        </thead>
        <tbody>
        {tableRows.length === 0 ? <div className="p-3 text-lg">There are no rooms</div> : tableRows }
         
        </tbody>
      </table>
    </div>
   </div>
  );
};
