import axios from "axios";
import "../Login.css";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);

  console.log(document.cookie);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <Button
        onClick={async () => {
          await axios
            .get("http://arq.gce-back.online/api/auth/health_check")
            .then(() => {
              window.location.href = "http://arq.gce-back.online/api/auth/google";
            })
            .catch(() => {
              setError(true);
            });
        }}
        color="primary"
      >
        Log with google
      </Button>
      {error && <div>Can't access the admin dashboard</div>}
    </div>
  );
};

export default Login;
