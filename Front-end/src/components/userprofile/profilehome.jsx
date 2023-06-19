import React, { useContext } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Profilehome = () => {
  const {user, setUser, userRefresh} = useContext(UserContext);
  const userId = user._id;
  console.log(userId);

  const [userName, setuserName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`http://localhost:5501/updateUser/`, {
        userId,
        userName,
        phoneNumber,
      });
      console.log(data);
      userRefresh()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col ">
        <div className="bg-white overflow-hidden w-[90%]  shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              الملف الشخصي
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              هذه بعض المعلومات عن المستخدم.{" "}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  الاسم الكامل
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.username}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  البريد الالكتروني
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  رقم الهاتف
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phoneNumber}
                </dd>
              </div>
              {/* <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    123 Main St
                                    <br />
                                    Anytown, USA 12345
                                </dd>
                            </div> */}
            </dl>
          </div>
        </div>
        <button
          onClick={handleOpen}
          className="inline-flex w-fit mt-4 items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
        >
          <FaEdit className="h-5 w-5 ml-2" />
          تعديل الملف الشخصي
        </button>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader style={{ marginBottom: "-120px" }}>
          تعديل الملف الشخصي{" "}
        </DialogHeader>
        <DialogBody divider style={{ marginTop: "30px", border: "none" }}>
          <div style={{ maxHeight: "550px", overflow: "auto", width: "550px" }}>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
              <form className="text-black" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="username"
                    >
                      اسم المستخدم
                    </label>
                    <input
                      id="username"
                      placeholder={user.username}
                      onChange={(e) => {
                        setuserName(e.target.value);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="username"
                    >
                      رقم الهاتف
                    </label>
                    <input
                      id="username"
                      placeholder={user.phoneNumber}
                      onChange={(e) => {
                        setphoneNumber(e.target.value);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                <div className="flex justify-start mt-6">
                  <DialogFooter>
                    <div className="flex justify-around gap-5 mt-6">
                      <Button
                        type="submit"
                        className="text-sm"
                        variant="gradient"
                        color="green"
                        onClick={()=>{
                          handleOpen();
                        }}
                      >
                        <span>تحديث</span>
                      </Button>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 text-sm"
                      >
                        <span>الغاء</span>
                      </Button>
                    </div>
                  </DialogFooter>
                </div>
              </form>
            </section>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
