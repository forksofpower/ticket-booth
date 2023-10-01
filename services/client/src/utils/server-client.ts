import axios from "axios";
import { IncomingHttpHeaders } from "http";

import { config } from "@/config";

const { apiGatewayUrl } = config;

const serverClient = (requestHeaders?: IncomingHttpHeaders) => {
  // We are on the server
  // Requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/ROUTE
  return axios.create({
    baseURL: apiGatewayUrl,
    headers: requestHeaders,
  });
};
export default serverClient;
