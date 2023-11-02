import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    if (count === 0) {
      navigate(path);
    }

    return () => clearInterval(interval);
  }, [count, path]);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <p
        style={{
          position: "absolute",
          top: "50%",
        }}
      >
        Redirecting in {count} second{count !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default LoadingToRedirect;
