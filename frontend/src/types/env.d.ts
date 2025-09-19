declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_AUTH0_CLIENT_ID: string;
    REACT_APP_AUTH0_DOMAIN: string;
    REACT_APP_AUTH0_CALLBACK_URL: string;
    REACT_APP_API_SERVER_URL: string;
    REACT_APP_ASSETS_SERVER_URL: string;
    REACT_APP_WEBSOCKET_SERVER_URL: string;
    REACT_APP_AUTH0_AUDIENCE: string;
  }
}
