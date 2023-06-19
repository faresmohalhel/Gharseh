"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function DismissableModal(props) {
  const [openModal, setOpenModal] = useState("");

  return (
    <>
      <button onClick={() => setOpenModal("dismissible")}>
        <img src={props.image} className={`${props.classes} bg-cover`} />
      </button>
      <Modal
        dismissible
        show={openModal === "dismissible"}
        onClose={() => setOpenModal(undefined)}
      >
        {/* <Modal.Header>Terms of Service</Modal.Header> */}
        <Modal.Body>
          <div className="space-y-6" onClick={() => setOpenModal(undefined)}>
            <img src={props.image} />
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
