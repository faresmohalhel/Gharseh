import { TableOfProviders } from "./TableOfProviders";
import { useState, useEffect, useReducer } from "react";
import { GrRevert } from "react-icons/gr";

import { Button, Modal } from "flowbite-react";

import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import axios from "axios";
import DismissableModal from "../components/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleRemove, CiCircleCheck } from "react-icons/ci";
import Swal from "sweetalert2";
import UpdateEvent from "../Add Event Page/updateEvent";

export const Hotels = () => {
  const [events, setEvents] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [openModal, setOpenModal] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5500/events")
      .then((response) => {
        setEvents(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  const handleDelete = (name) => {
    Swal.fire({
      title: ` do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, "", "success");

        axios
          .delete("http://localhost:5500/delete-event/" + name)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        // forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };
  const handleAccepted = (id) => {
    axios
      .put("http://localhost:5500/admin/hotel/hotels/request/accept/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Added Successfully ",
      showConfirmButton: false,
      timer: 1800,
    });
    // forceUpdate();
  };

  const handleRejected = (id, name) => {
    console.log(id);
    Swal.fire({
      title: `Are you sure to reject ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been rejected `, "", "success");

        axios
          .put("http://localhost:5500/admin/hotel/hotels/request/reject/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        // forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };
  return (
    <>
      <main className="p-4 px-8 mx-auto h-auto pt-20 mt-8 ml-[256px]">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4 w-full">
          {events.map((event) => {
            return (
              <div className="h-full">
                <div className="p-10 h-full shadow-md border  rounded-md">
                  <div className="w-full lg:max-w-full lg:flex h-full">
                    <div
                      className="lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center  overflow-hidden h-full"
                      title="Mountain"
                    >
                      <DismissableModal
                        image={event.image}
                        classes="min-h-[300px] object-cover"
                      />
                    </div>
                    <div className="border-r border-b border-l border-white lg:border-l-0 lg:border-t lg:border-white bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8">
                        <div className="relative space-x-3">
                          <div
                            id=""
                            className="bg-white rounded divide-y divide-gray-100 shadow absolute right-2 top-0"
                          >
                            <div
                              className="tooltip tooltip-error text-white"
                              data-tip="Delete"
                            >
                              <button
                                onClick={() => handleDelete(event.name)}
                                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
                              >
                                <AiOutlineDelete className="text-red-500 text-[15px]" />
                              </button>
                            </div>
                          </div>
                          <div
                            className="tooltip text-white absolute top-0 right-16"
                            data-tip="Revert"
                          >
                            <button
                              onClick={() => handleActivate(event.name)}
                              className="btn bg-white hover:bg-gray-200 shadow-lg hover:shadow-xl border-none "
                            >
                              <GrRevert className="text-red-500 text-[15px]" />
                            </button>
                          </div>
                          <div
                            className="tooltip text-white absolute top-0 right-16"
                            data-tip="Revert"
                          >
                            <button
                              onClick={() => {
                                // handleActivate(event.name);
                                setOpenModal("dismissible");
                                console.log(event.name);
                              }}
                              className="btn bg-white hover:bg-gray-200 shadow-lg hover:shadow-xl border-none "
                            >
                              <GrRevert className="text-red-500 text-[15px]" />
                            </button>
                            <Modal
                              dismissible
                              show={openModal === "dismissible"}
                              onClose={() => setOpenModal(undefined)}
                            >
                              <Modal.Body>
                                <UpdateEvent queryName={event.name} />
                              </Modal.Body>
                            </Modal>
                          </div>
                          {/*  <button
                            onClick={() => setOpenModal("dismissible")}
                          ></button>
                          <Modal
                            dismissible
                            show={openModal === "dismissible"}
                            onClose={() => setOpenModal(undefined)}
                          >
                            <Modal.Body>{UpdateEvent(event.name)}</Modal.Body>
                          </Modal> */}
                        </div>

                        <p className="text-sm text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>

                          {event.locationName}
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">
                          {event.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm flex">
                          <div className="flex flex-col w-28">
                            <span className="font-bold text-gray-900">
                              Start Date
                            </span>
                            <span>
                              {
                                new Date(event.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                          <div className="flex flex-col w-28">
                            <span>Event Length</span>
                            <span>{event.eventLength}</span>
                          </div>
                          <div className="flex flex-col w-28">
                            <span>Max Volunteers</span>
                            <span>{event.maxVolunteers}</span>
                          </div>
                          <div className="flex flex-col w-28 mr-2">
                            <span>Number of Trees</span>
                            <span>{event.numberOfTrees}</span>
                          </div>
                          <div className="flex flex-col w-28">
                            <span>Tree Price</span>
                            <span>{event.treePrice}</span>
                          </div>
                          <div className="flex flex-col w-28">
                            <span>Donations</span>
                            <span>{event.donations}</span>
                          </div>
                          <div className="flex flex-col w-60">
                            <span>Volunteers</span>
                            <span className="overflow-scroll overflow-x-hidden">
                              {event.volunteers.map((volunteer) => {
                                return (
                                  <div>
                                    <span>{volunteer.email}</span>
                                  </div>
                                );
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
