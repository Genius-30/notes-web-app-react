import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CustomLoader, Header } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { ToastContainer } from "react-toastify";
import { fetchNotes } from "./store/noteSlice";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [authenticationComplete, setAuthenticationComplete] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoader(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("Error fetching user: ", error))
      .finally(() => {
        setLoader(false);
        setAuthenticationComplete(true);
      });
  }, []);

  useEffect(() => {
    if (authStatus && userData.userData) {
      const userId = userData.userData.$id;
      dispatch(fetchNotes(userId));
    }
  }, [authStatus, dispatch]);

  const showHeader = !["/login", "/signup"].includes(location.pathname);

  if (!authenticationComplete && loader) {
    return <CustomLoader />;
  }

  return (
    <>
      <div className="bg-slate-900 h-screen w-full p-2 md:p-4 poppins-bold font-bold flex flex-col overflow-hidden">
        {showHeader && <Header />}
        <main
          className={`h-full w-full ${showHeader && "mt-20"} oveflow-y-scroll`}
        >
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default Layout;
