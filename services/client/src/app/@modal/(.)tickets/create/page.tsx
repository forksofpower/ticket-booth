"use client";

import React from "react";

import NewTicketForm from "@/components/forms/new-ticket-form";
import Modal from "@/components/layout/modal";
import { useConfirmNavigation } from "@/contexts/navigation";

export default function CreateTicketModal() {
  const router = useConfirmNavigation();
  return (
    <Modal>
      <button
        onClick={router.back}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      <NewTicketForm onCancel={router.back} />
    </Modal>
  );
}
