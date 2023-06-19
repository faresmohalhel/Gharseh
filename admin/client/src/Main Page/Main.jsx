import { Stats } from "./Stats";
import { TableOfProviders } from "../Providers Page/TableOfProviders";
import { TableOfRooms } from "../Rooms Page/TableOfRooms";
import { TableOfUsers } from "../Users Page/TableOfUsers";
import { TableOfRequests } from "../Requests Page/TableOfRequests";
import { TableOfTrash } from "../Trash Page/TableOfTrash";
export const Main = () => {
  return (
    <main className="p-4 px-8  md:ml-64 h-auto py-20 mt-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 ">
        <Stats />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <TableOfProviders />
      </div>

      {/* <div className="grid grid-cols-1 gap-4">
        <TableOfRooms />
      </div> */}

      <div className="grid grid-cols-1 gap-4">
        <TableOfUsers />
      </div>
      {/* <div className="grid grid-cols-1 gap-4">
        <TableOfRequests />
      </div> */}

      <div className="grid grid-cols-1 gap-4">
        <TableOfTrash />
      </div>
    </main>
  );
};
