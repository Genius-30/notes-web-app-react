import React, { useState } from "react";
import { Button, CustomLoader, Input, Logo } from "./index";
import loginImg from "../assets/images/login.webp";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const login = async (data) => {
    setLoader(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
      toast.success("Login Successfully");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
    setLoader(false);
  };

  return (
    <div className="h-full w-full flex items-center justify-center text-slate-800">
      <div className="h-auto md:h-auto max-h-[90%] w-[95%] min-[400px]:w-4/5 md:aspect-video bg-gray-100 shadow-md shadow-slate-950 rounded-lg py-4 md:py-10 px-4 md:px-14 flex flex-col items-center gap-8 md:gap-4">
        <div className="w-full flex max-[300px]:flex-col flex-row max-[300px]:items-start items-center justify-between">
          <Logo className={"h-8"} />
          <p className="text-sm md:text-base">
            New User?
            <Link
              to={"/signup"}
              className="text-blue-900 hover:underline text-sm md:text-base"
            >
              {" Sign Up"}
            </Link>
          </p>
        </div>
        <div className="w-full flex flex-1 items-center gap-4">
          <div className="h-full hidden sm:flex flex-[0.75] justify-center items-center">
            <img
              src={loginImg}
              alt="loginImg"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="h-full w-full flex flex-1 flex-col items-center justify-center gap-6 md:gap-10">
            <div className="w-full flex flex-col">
              <p className="text-xl md:text-3xl">Welcome Back!</p>
              <p className="text-sm md:text-base text-slate-500">
                Login to continue
              </p>
            </div>
            <form
              onSubmit={handleSubmit(login)}
              className="flex flex-col gap-6 md:gap-10 w-full"
            >
              <div className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  leadingIcon={<Mail className="h-full" />}
                  className="min-h-12 md:h-14"
                  error={errors.email}
                  errorMessage="Email is required!"
                  {...register("email", {
                    required: true,
                  })}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  leadingIcon={<LockKeyhole className="h-full" />}
                  trailingIcon={
                    showPassword ? (
                      <Eye className="h-full" />
                    ) : (
                      <EyeOff className="h-full" />
                    )
                  }
                  onTrailingIcon={() => setShowPassword(!showPassword)}
                  className="min-h-12 md:h-14"
                  error={errors.password}
                  errorMessage={
                    errors.password?.type === "minLength" ||
                    errors.password?.type === "maxLength"
                      ? "Password must be between 8-20 characters!"
                      : errors.password?.type === "required" &&
                        "Password is required!"
                  }
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                  })}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  type="submit"
                  className="min-h-10 md:h-14 flex-1 whitespace-nowrap"
                  children={"Login"}
                />
                <Button
                  bgColor="bg-gray-200"
                  textColor="text-slate-800"
                  className="min-h-10 md:h-14 flex-1 text-[0.75rem] md:text-sm leading-3"
                  children={"FORGET PASSWORD?"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {loader && <CustomLoader />}
      <ToastContainer />
    </div>
  );
}

export default Login;
