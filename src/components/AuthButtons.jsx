import authService from "../appwrite/auth";
import { toast } from "react-toastify";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch(() => toast.error("Logout Failed: Please try again later!"));
  };

  return (
    <>
      {authStatus ? (
        <Button
          children="Logout"
          bgColor="bg-none"
          textColor="text-slate-800"
          className="h-10 w-24 border-2 border-solid border-slate-800 text-sm"
          onClick={handleLogout}
        />
      ) : (
        <>
          <Link to="/login">
            <Button
              children="Login"
              bgColor="bg-none"
              textColor="text-slate-800"
              className="h-10 w-24 border-2 border-solid border-slate-800 text-sm"
            />
          </Link>
          <Link to="/signup">
            <Button
              children={"Signup"}
              bgColor="bg-slate-800"
              className="h-10 w-24 border-2 border-solid border-slate-800 text-sm py-0"
            />
          </Link>
        </>
      )}
    </>
  );
}
