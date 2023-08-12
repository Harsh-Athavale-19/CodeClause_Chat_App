import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServerStatus.css";

const ServerStatus = () => {
  const [connectionState, setConnectionState] = useState("offline");

  const getStatus = async () => {
    setConnectionState("connecting");

    try {
      const response = await axios.get("http://localhost:3011/status");
      const current_state = response.data.server;

      if (current_state === "active") {
        setConnectionState("connected");
      }
    } catch (error) {
      console.error(error.message);
      setConnectionState("offline");
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <div className="status_wrapper">
        <div className={`status_icon ${connectionState} `}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="status_text">Server {`${connectionState}`} </p>
      </div>
    </>
  );
};

export default ServerStatus;
