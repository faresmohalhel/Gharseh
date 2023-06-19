import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-wrap m-3">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-start items-end">
            <div className="text-4xl font-bold">
              <span className="text-green-700">.</span>ازرع
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl  lg:text-6xl font-bold">
                نحن عشاق <span className="text-green-700">الطبيعة</span>
              </h1>
              <div className="flex w-20 h-2 bg-green-700 my-4 place-items-center" />
              <p className="text-xl font-bold  mb-10">
                كلما زاد تعمقنا في حب الطبيعة، زادت رغبتنا في الحفاظ عليها
                والاعتناء بها. نحن ندرك أننا جزء لا يتجزأ من هذا العالم الطبيعي
                الرائع، وأن الحفاظ على توازنه وجماله هو واجب علينا
              </p>
              <div className="flex justify-start gap-2">
               <Link to='/Signup'> <button className="flex justify-end bg-green-500 text-white text-2xl font-bold px-4 py-2 rounded shadow">
                  انضم لفريقنا
                </button></Link>
              </div>
            </div>
          </header>
        </div>
      </div>
      <img
        src="https://grist.org/wp-content/uploads/2020/11/planting-tree.jpg"
        alt="Leafs"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default About;
