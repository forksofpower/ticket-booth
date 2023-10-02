interface AppConfig {
  apiGatewayUrl: string;
}

export const config: AppConfig = {
  apiGatewayUrl:
    process.env.API_GATEWAY_URL ||
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
};

export default new Object(config) as AppConfig;
