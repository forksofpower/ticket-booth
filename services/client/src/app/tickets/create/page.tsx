"use client";

import NewTicketForm from "@/components/forms/new-ticket-form";
import { useConfirmNavigation } from "@/contexts/navigation";
import { routes } from "@/routes";

export default function CreateTicketPage() {
  const router = useConfirmNavigation();
  return (
    <div className="page-container flex items-center justify-center">
      <div className="w-full p-6 sm:w-10/12 md:w-8/12 lg:w-1/2">
        <NewTicketForm onCancel={() => router.push(routes.listTickets())} />
      </div>
    </div>
  );
}
