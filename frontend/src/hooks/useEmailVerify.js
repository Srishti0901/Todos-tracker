import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useEmailVerify = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const EmailVerify = async (_id, uniqueString) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/user/verify/${_id}/${uniqueString}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    alert(data.message);
    navigate("/");
  };

  return { EmailVerify, isLoading, error };
};
