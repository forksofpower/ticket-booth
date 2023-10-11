"use client";

import { useRouter } from "next/navigation";
import React from "react";

import NewTicketForm from "@/components/forms/new-ticket-form";
import Modal from "@/components/modal";

export default function CreateTicketModal() {
  const router = useRouter();
  return (
    <Modal>
      <NewTicketForm escapeForm={router.back} />
    </Modal>
  );
}
