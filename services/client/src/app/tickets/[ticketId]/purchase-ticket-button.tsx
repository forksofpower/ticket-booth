"use client";

import { useRouter } from "next/navigation";

import { useRequest } from "@/hooks/use-request";
import { routes } from "@/routes";

const PurchaseTicketButton: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const router = useRouter();
  const { doRequest: purchaseTicket } = useRequest({
    url: `/api/orders`,
    method: "post",
    body: {
      ticketId,
    },
    onSuccess: (order) => {
      router.push(routes.orders.show(order.id));
    },
  });
  return (
    <button onClick={() => purchaseTicket()} className="btn btn-primary">
      Purchase
    </button>
  );
};
export default PurchaseTicketButton;
