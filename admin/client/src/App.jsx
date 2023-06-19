import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { DashBoard } from "./DashBoard";
// import { Main } from "./Main Page/Main";
// import { Hotels } from "./Providers Page/Hotels";
// import { Users } from "./Users Page/Users";
// import { Requests } from "./Requests Page/Requests";
// import { Nav } from "./Nav";
// import { Aside } from "./Aside";
import { NumbersProvider } from "./context/stats";
import { Main } from "./Main Page/Main";
import { DashBoard } from "./DashBoard";
import { Nav } from "./Nav";
import { Aside } from "./Aside";
import { Hotels } from "./Providers Page/Hotels";
import { Users } from "./Users Page/Users";
import { Rooms } from "./Rooms Page/Rooms";
import { Requests } from "./Requests Page/Requests";
import { Trash } from "./Trash Page/Trash";
import { Message } from "./Meessages/Message";
import { AddEvent } from "./Add Event Page/AddEvent";

import React from "react";

export const UserContext = React.createContext();

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Aside />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/main" element={<Main />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
