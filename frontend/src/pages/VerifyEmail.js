import { useEmailVerify } from "../hooks/useEmailVerify";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { EmailVerify, isLoading } = useEmailVerify();
  const { _id, uniqueString } = useParams();

  const handleEmail = async (e) => {
    e.preventDefault();
    await EmailVerify(_id, uniqueString);
  };
  return (
    <div className="home">
      <div className="todos">
        <button disabled={isLoading} onClick={handleEmail}>
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
