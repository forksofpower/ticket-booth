"use client";
import { useRouter } from "next/navigation";

import NewTicketForm from "@/components/forms/new-ticket-form";
import { routes } from "@/routes";

export default function CreateTicketPage() {
  const router = useRouter();
  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2">
      <NewTicketForm escapeForm={() => router.push(routes.listTickets())} />
    </div>
  );
}
