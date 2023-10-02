"use client";

import { useRouter } from "next/navigation";
import React from "react";

import CountDownTimer from "@/components/countdown-timer";
import { routes } from "@/routes";

import { Order } from "./page";

const OrderExpiration: React.FC<{ order: Order }> = ({ order }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function closeModal() {
    modalRef.current?.close();
    router.push(routes.tickets.show(order.ticket.id));
  }
  function openModal() {
    modalRef.current?.showModal();
  }

  function onComplete() {
    openModal();
  }
  return (
    <>
      <CountDownTimer
        expiresAt={order.expiresAt}
        onCountdownComplete={onComplete}
        options={{ countDownCompleteDelay: 1000 }}
      />
      <dialog id="countdown-complete-modal" ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Order Expired</h3>
          <p className="py-4">
            The order expired before you completed the purchase!
          </p>
          <div className="modal-action">
            {/* <form method="dialog"> */}
            <button onClick={closeModal} className="btn btn-outline">
              Find more tickets
            </button>
            {/* </form> */}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default OrderExpiration;
