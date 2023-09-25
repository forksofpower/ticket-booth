interface AppConfig {
  apiGatewayUrl: string;
}

export const config: AppConfig = {
  apiGatewayUrl:
    process.env.API_GATEWAY_URL ||
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
};

// Export Singleton
let instance: AppConfig | undefined;
if (!instance) {
  instance = new Object(config) as AppConfig;
}
export default instance;
