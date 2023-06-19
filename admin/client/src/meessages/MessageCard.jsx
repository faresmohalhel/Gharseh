import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { Button } from "flowbite-react";

const MessageCard = () => {
  const [messages, setMessages] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/message");
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    MySwal.fire({
      title: `Do you want to delete this message`,

      showCancelButton: true,
      buttons: {
        confirm: { text: "Ubah", className: "sweet-warning" },
        cancel: "Batalkan",
      },
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:5500/api/message/${id}`)
          .then(function (response) {
            // Update the messages list after successful deletion
            setMessages(messages.filter((messages) => messages._id !== id));
          })
          .catch(function (error) {
            console.error("Error deleting messages", error);
            console.log(id);
          });
      }
    });
  };
  return (
    <>
      <div>
        {/* <h2 className="text-center text-4xl my-5">Me</h2> */}

        <div className="grid   lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 content-center justify-center">
          {messages.map((message) => (
            <div
              key={message._id}
              className="max-w-sm p-6 ms-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Name: {message.name}
              </h4>
              <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Email: {message.email}
              </h6>
              <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                phone Number: {message.phoneNumber}
              </h6>

              <p className="mb-3 font-normal overflow-auto text-gray-700 dark:text-gray-400 ">
                Message: {message.message}
              </p>
              <div className="flex justify-center content-center">
                <a
                  onClick={() => handleDelete(message._id)}
                  className=" items-center inline-block  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  delete
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageCard;
