import React from "react";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <div
      className="flex items-center flex-col space-y-40 mb-12 
   bg-fixed bg-center bg-cover bg-[url(https://pbs.twimg.com/media/DeS1aMCWsAAgYTR.jpg)]"
      style={{ height: "60vh" }}
    >
      <header className="bg-black/50 w-full" style={{ height: "60vh" }}>
        <div className="flex items-center">
          <div className="px-4 mx-auto mt-16 mb-16 max-w-7xl sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-200 sm:text-5xl md:text-6xl font-title">
                <span className="block text-green-200">
                  الطبيعة تحتاجنا ازرع شجرة
                </span>
              </h1>
              <p className="max-w-md mx-auto mt-3 font-bold text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                بزرع شجرة واحدة، يمكنك أن تكون جزءًا من هذا التغيير الإيجابي
                <br />
                معنا لحماية البيئة والمحافظة على التوازن البيئي
              </p>
              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link to='/services'
                    className="block shadow-lg w-full px-8 py-3 text-base font-bold text-gray-200 hover:text-gray-100 bg-green-200/10 hover:bg-green-200/30 hover:backdrop-blur-xl backdrop-blur-lg rounded-md md:py-4 md:text-lg md:px-10"
                  >
                    تبرع للطبيعة
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Donate;
