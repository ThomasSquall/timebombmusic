
import React, { useEffect } from "react";

interface FreshchatProps {
  isAuthenticated: boolean;
}

export const Freshchat: React.FC<FreshchatProps> = ({ isAuthenticated }) => {
  useEffect(() => {
    if (isAuthenticated) {
      // Add Freshchat script dynamically
      const script = document.createElement("script");
      script.src = "//eu.fw-cdn.com/11473188/426861.js";
      script.async = true;
      script.setAttribute("chat", "true");
      document.body.appendChild(script);
    }
  }, [isAuthenticated]);

  return null;
};

export default Freshchat;
