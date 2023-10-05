import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import config from "@/config";

export async function requestHandler(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const revalidate = searchParams.get("revalidate");
  const body = req.body;
  const url = `${config.apiGatewayUrl}${req.nextUrl.pathname}`;

  const payload = {
    method: req.method,
    headers: req.headers,
    ...(req.body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(url, payload);

  console.log(response.body);
  if (response.ok && revalidate) {
    try {
      revalidatePath(revalidate);
    } catch (e) {
      console.error(e);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
