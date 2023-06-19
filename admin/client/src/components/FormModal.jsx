import { Button, Modal } from "flowbite-react";
import { Children, useState } from "react";
import UpdateEvent from "../Add Event Page/updateEvent";

export default function FormModal(props) {
  const [openModal, setOpenModal] = useState("");

  return (
    <>
      <Modal
        dismissible
        show={openModal === "dismissible"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Body>{props.Children}</Modal.Body>
      </Modal>
    </>
  );
}
