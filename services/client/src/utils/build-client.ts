import axios from "axios";
import { NextPageContext } from "next";

import { isServer } from "./predicates";

const buildClient = ({ req }: NextPageContext) => {
  if (isServer) {
    // We are on the server
    // Requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local/ROUTE
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req!.headers,
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
