import { headers } from "next/headers";
import React from "react";

// import CountDownTimer from "@/components/countdown-timer";
import buildClient from "@/utils/build-client";

import OrderExpiration from "./expiration-countdown";

type ShowOrderPageProps = {
  params: {
    orderId: string;
  };
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  expiresAt: string;
  ticket: {
    id: string;
    title: string;
    price: number;
  };
};

async function fetchOrder(orderId: string) {
  const client = buildClient(Object.fromEntries(headers().entries()));
  const res = await client.get<Order>(`/api/orders/${orderId}`);
  return res.data;
}

const ShowOrderPage = async ({ params: { orderId } }: ShowOrderPageProps) => {
  const order = await fetchOrder(orderId);
  // console.log(order);
  return (
    <div>
      <h1>Order: {order.id}</h1>
      <h1>{order.ticket.title}</h1>
      <p>status: {order.status}</p>
      <p>price: ${order.ticket.price}</p>
      <OrderExpiration order={order} />
    </div>
  );
};

export default ShowOrderPage;
