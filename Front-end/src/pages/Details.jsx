import { useContext, useEffect, useState } from "react";
import Popup from "../components/Details/Popup";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Typography } from "@material-tailwind/react";


function Details(props) {
  const [toggle, setToggle] = useState(false);
  const [eventDataDetails, setEventDataDetails] = useState([])
  const [isloading, setisloading] = useState(true);
  const { id } = useParams()
  let { auth } = useContext(AuthContext);

  const handlePopup = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    axios.get(`http://localhost:5501/api/getOneEvent/${id}`)
      .then((res) => {
        setEventDataDetails(res.data)
        setisloading(false)
        console.log(res.data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  const handleMapClick = () => {
    // Open Google Maps and get directions
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${eventDataDetails?.location[0].lat},${eventDataDetails?.location[0].lng}`);
  };
  return (
    <>
     
     {isloading && (
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
      {eventDataDetails !== null && isloading === false && (
        <section>
          <div className="relative mx-auto max-w-screen-xl px-4 py-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 md:grid-cols-1">
              <figure className="relative h-full w-full">
                <img
                  className="h-full w-sc rounded-xl"
                  src={eventDataDetails?.image}
                  alt="nature image"
                />
                <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      {eventDataDetails?.name}
                    </Typography>
                    <Typography color="gray" className="mt-2 font-normal">
                      {
                        new Date(eventDataDetails?.startDate)
                          ?.toString()
                          .split("T")[0]
                      }
                    </Typography>
                  </div>
                  <Typography variant="h5" color="blue-gray">
                    {eventDataDetails?.eventLength} ساعات
                  </Typography>
                </figcaption>
              </figure>

              <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-24 md:py-16 lg:px-8 lg:py-20">
                <div className="row-gap-8 grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-4">
                  <div className="mb-12 text-center md:mb-0 md:border-r-2 dark:md:border-slate-500">
                    <div className="font-heading text-[2.6rem] text-green-500 font-bold dark:text-white lg:text-3xl xl:text-2xl">
                      {eventDataDetails?.maxVolunteers} اشخاص
                    </div>
                    <p className="text-sm font-medium uppercase  text-gray-800 dark:text-slate-400 lg:text-base">
                      عدد المتطوعين المطلوبين
                    </p>
                  </div>
                  <div className="mb-12 text-center md:mb-0 md:border-r-2 dark:md:border-slate-500">
                    <div className="font-heading text-[2.6rem] font-bold text-green-500 dark:text-white lg:text-3xl xl:text-2xl">
                      {eventDataDetails?.volunteers?.length} اشخاص
                    </div>
                    <p className="text-sm font-medium uppercase  text-gray-800 dark:text-slate-400 lg:text-base">
                      عدد المتطوعين الى الآن
                    </p>
                  </div>
                  <div className="mb-12 text-center md:mb-0 md:border-r-2 dark:md:border-slate-500">
                    <div className="font-heading text-[2.6rem] font-bold text-green-500 dark:text-white lg:text-3xl xl:text-2xl">
                      {eventDataDetails?.numberOfTrees} شجرة
                    </div>
                    <p className="text-sm font-medium uppercase  text-gray-800 dark:text-slate-400 lg:text-base">
                      عدد الاشجار المراد زرعها
                    </p>
                  </div>
                  <div className="mb-12 text-center md:mb-0 md:border-r-2 dark:md:border-slate-500">
                    <div className="font-heading text-[2.6rem] font-bold text-green-500 dark:text-white lg:text-3xl xl:text-2xl">
                      {eventDataDetails?.treePrice} دنانير
                    </div>
                    <p className="text-sm font-medium uppercase  text-gray-800 dark:text-slate-400 lg:text-base">
                      سعر الشجرة الواحدة
                    </p>
                  </div>
                </div>
              </div>
        
            </div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                    <p className="mb-4 font-light">
                      {eventDataDetails?.description}
                    </p>
                    <form className="mt-8">
                      <div className="mt-8 flex  justify-start gap-4">
                        {eventDataDetails?.donations <
                          eventDataDetails?.numberOfTrees *
                            eventDataDetails?.treePrice && (
                          <Link to={`/Payment/${eventDataDetails._id}`}>
                            <button
                              type="submit"
                              className="block rounded bg-green-600 px-5 py-3 text-lg font-medium text-white hover:bg-green-500"
                            >
                              تبرع الان
                            </button>
                          </Link>
                        )}

                        {/* Modal toggle */}
                        {eventDataDetails?.maxVolunteers !=
                          eventDataDetails?.volunteers?.length && (
                          <Link
                            className="block rounded bg-green-600 px-5 py-3 text-lg font-medium text-white hover:bg-green-500"
                            type="button"
                            onClick={auth ? handlePopup : undefined}
                            to={auth ? undefined : "/Login"}
                            data-modal-toggle="authentication-modal"
                          >
                            تطوع الآن
                          </Link>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </section>
          </div>
          <div class="relative w-full h-96">
            <Map
              google={props.google}
              zoom={17}
              style={{ width: '100%', height: '400px' }}
              initialCenter={{ lat: eventDataDetails?.location[0].lat, lng: eventDataDetails?.location[0].lng }}
              onClick={handleMapClick} // Add onClick event handler
            >
              <Marker position={{ lat: eventDataDetails?.location[0].lat, lng: eventDataDetails?.location[0].lng }} />
            </Map>
          </div>
        </section>
      )}
      

        
     

      <Popup toggle={toggle} setToggle={setToggle} />
    </>

  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCin20Um_kf5R-sj9QADNLFA_Kro06A8Mw'
})(Details);