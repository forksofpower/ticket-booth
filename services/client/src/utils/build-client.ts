import axios from "axios";
import { IncomingHttpHeaders } from "http";

import { config } from "@/config";

import { isServer } from "./predicates";

const { apiGatewayUrl } = config;

const buildClient = (requestHeaders?: IncomingHttpHeaders) => {
  if (isServer) {
    // We are on the server
    // Requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/ROUTE
    return axios.create({
      baseURL: apiGatewayUrl,
      headers: requestHeaders,
    });
  } else {
    // We are on the browser
    // Requests can be made with a base url of '/'
    return axios.create({
      baseURL: "/",
      withCredentials: true,
    });
  }
};

export default buildClient;
