import { Progress, Spinner, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Service = ({ search }) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(isLoading)
    axios
      .get("http://localhost:5501/api/getEvents")
      .then((res) => {
        setEventData(res.data);
        console.log(res.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  return (
    <>
       {isLoading && (
              <div className="flex items-center h-[50vh] justify-center bg-green-50">

              <svg className="animate-spin h-8 w-8 text-green-800" style={{marginLeft: "1rem"}} xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75 ms-5" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
              </svg>
          
              <span class="text-green-500 text-3xl font-bold">انتظر...</span>
          
          </div> )}
    <div
      className="grid bg-green-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20"
      dir="rtl"
    >
      {/* CARD */}
      {eventData?.map((event) => {
        if (search === "") {
          return (
            <>
                           
                <div
                  className="bg-white rounded-xl shadow-md overflow-hidden "
                  key={event._id}
                >
                  <div className="relative">
                    <img
                      className="w-full h-72 object-cover"
                      src={event.image}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-5xl font-medium text-gray-800  mb-3">
                      {event.name}
                    </div>
                    <p className="text-gray-600 mb-1 text-sm">
                      الهدف : زراعة {event.numberOfTrees} شجرة
                    </p>
                    <p className="text-gray-600 mb-1 text-sm">
                      المبلغ: {event.donations} دينار من{" "}
                      {event.numberOfTrees * event.treePrice} دينار
                    </p>
                    <Progress
                      value={
                        (event.donations /
                          (event.numberOfTrees * event.treePrice)) *
                        100
                      }
                      label={
                        (event.donations /
                          (event.numberOfTrees * event.treePrice)) *
                        100
                      }
                      color="green"
                      size="md"
                      className="bg-green-200"
                    />
                    <div className="flex gap-3 max-w-sm mt-2">
                      <Link to={`/Details/${event._id}`}>
                        <button className="py-2.5 px-6 rounded-lg text-sm font-bold bg-green-200 text-teal-800">
                          تفاصيل
                        </button>
                      </Link>
                      {event.donations <
                        event.numberOfTrees * event.treePrice && (
                        <Link to={`/Payment/${event._id}`}>
                          <button className="py-2.5 px-6 rounded-lg text-sm font-bold text-white bg-green-600">
                            تبرع الآن
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
             
            </>
          );
        } else if (event.name.includes(search)) {
          return (
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden "
              key={event._id}
            >
              <div className="relative">
                <img className="w-full h-96 object-cover" src={event.image} />
              </div>
              <div className="p-4">
                <div className="text-5xl font-medium text-gray-800  mb-3">
                  {event.name}
                </div>
                <p className="text-gray-600 mb-1 text-sm">
                  الهدف : زراعة {event.numberOfTrees} شجرة
                </p>
                <p className="text-gray-600 mb-1 text-sm">
                  المبلغ: {event.donations} دينار من{" "}
                  {event.numberOfTrees * event.treePrice} دينار
                </p>
                <Progress
                  value={
                    (event.donations /
                      (event.numberOfTrees * event.treePrice)) *
                    100
                  }
                  color="green"
                  className="bg-green-200"
                />
                <div className="flex gap-3 max-w-sm mt-2">
                  <Link to={`/Details/${event._id}`}>
                    <button className="py-2.5 px-6 rounded-lg text-sm font-bold bg-green-200 text-teal-800">
                      تفاصيل
                    </button>
                  </Link>
                  {event.donations < event.numberOfTrees * event.treePrice && (
                    <Link to={`/Payment/${event._id}`}>
                      <button className="py-2.5 px-6 rounded-lg text-sm font-bold text-white bg-green-600">
                        تبرع الآن
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>

    </>
  );
};

export default Service;
