import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/jwt-provider";

Pusher.log = function (message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

(window as any).Pusher = Pusher;

const apiServerUrl = process.env.REACT_APP_WEBSOCKET_SERVER_URL;

type UseWebsocketsReturnType = {
  echo?: Echo;
};

export const useWebsockets = (): UseWebsocketsReturnType => {
  const [echo, setEcho] = useState<Echo>();
  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();

      const options = {
        broadcaster: "pusher",
        key: "7f438hb78f334890rt8h34",
        cluster: "mt1",
        forceTLS: false,
        encrypted: false,
        authEndpoint: apiServerUrl + "/auth",
        wsHost: window.location.hostname,
        wsPort: 6001,
        wssPort: 6001,
        enableStats: false,
        enabledTransports: ["ws", "wss"],
        auth: {
          headers: {
            Authorization: "Bearer " + accessToken,
            Accept: "application/json",
          },
        },
      };

      setEcho(new Echo(options));
    })();
  }, [getAccessTokenSilently, setEcho]);

  return {
    echo,
  };
};
