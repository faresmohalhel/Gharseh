import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Orderhistory() {
  const {user} = useContext(UserContext);
  const email = user.email;

  const [donerEvents, setDonerEvents] = useState([]);
  const [isLoading, setisloading] = useState(true)

  const getDonerEvents = async () => {
    try {
      const data = await axios.get("http://localhost:5501/api/getDonerEvent",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }});
      setDonerEvents(data.data);
      setisloading(false)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDonerEvents();
    console.log(donerEvents);
  }, []);
  return (
<>
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-900">
        سجل التبرعات
        </h1>
        <div class="w-20 h-2 bg-green-700 my-4"></div>
      </div>

      {isLoading && (
              <div className="flex items-center h-[50vh] justify-center">

              <svg className="animate-spin h-8 w-8 text-green-800" style={{marginLeft: "1rem"}} xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75 ms-5" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
              </svg>
          
              <span class="text-black text-3xl font-bold">{" "}انتظر...</span>
          
          </div> )}

      {isLoading !== true && <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start rounded-lg bg-green-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-2xl md:text-2xl font-semibold leading-6 xl:leading-5 text-gray-900">
              {" "}
              الفعاليات
            </p>
            { donerEvents?.map((data) => (
              <div
                key={data._id}
                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
              >
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-4 mb-4 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-green-800">
                      {data.name}
                    </h3>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <div className="gap-4">
                      <span className="text-gray-500">تاريخ الفعالية: </span>
                      <span className="text-sm leading-none text-gray-800">
                        {data.startDate.toString().split("T")[0]}
                      </span>
                    </div>
                    <div className="gap-4">
                      <span className="text-gray-500">المبلغ المتبرع به:  </span>
                      <span className="text-sm leading-none text-gray-800">
                      {data?.donations} دينار
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </div>




</>




  );
}
