import axios from "axios";
import { IncomingHttpHeaders } from "http";

import { isServer } from "./predicates";

const buildClient = (requestHeaders: IncomingHttpHeaders) => {
  if (isServer) {
    // We are on the server
    // Requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/ROUTE
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
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
