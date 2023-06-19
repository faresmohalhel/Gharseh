import React from "react";

const Hero = ({ search, setSearch }) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://mygardenlife.com/wp-content/uploads/2023/01/Man-with-shovel-planting-a-tree.jpg) no-repeat center",
        backgroundSize: "cover",
      }}
      className="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
    >
      <h1 className="pb-4 text-6xl">
        الفعاليات <span className="text-green-500">الخضراء</span>
      </h1>
      <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
        <div className="relative z-30 text-base text-black" dir="rtl">
          <input
            type="text"
            defaultValue=""
            placeholder="ابحث"
            className="mt-2 shadow-md border-2 border-green-500 focus:shadow focus:outline-none focus:border-green-500 rounded-2xl py-3 px-6 block w-full"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
          <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto"></div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
