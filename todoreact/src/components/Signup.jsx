import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import signupImg from "../assets/images/signup.webp";
import Input from "./Input";
import Button from "./Button";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import CustomLoader from "./CustomLoader";
import { fetchNotes } from "../store/noteSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setLoader(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData)
          dispatch(login(currentUserData.email, currentUserData.password));
        dispatch(fetchNotes(currentUserData.$id));
        navigate("/");
        toast.success("Account created successfully!");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
    setLoader(false);
  };

  return (
    <div className="h-full w-full flex items-center justify-center text-slate-800">
      <div className="h-auto md:h-auto max-h-[90%] w-[95%] min-[400px]:w-4/5 md:aspect-video bg-gray-100 shadow-md shadow-slate-950 rounded-lg py-4 sm:py-6 md:py-10 px-4 sm:px-6 md:px-14 flex flex-col items-center gap-8 md:gap-4">
        <div className="w-full flex max-[300px]:flex-col flex-row max-[300px]:items-start items-center justify-between">
          <Logo className={"h-8"} />
          <p className="text-sm md:text-base">
            Existing user?
            <Link
              to={"/login"}
              className="text-blue-900 hover:underline text-sm md:text-base"
            >
              {" Log in"}
            </Link>
          </p>
        </div>
        <div className="w-full flex flex-1 items-center gap-4">
          <div className="h-full hidden sm:flex flex-[0.75] justify-center items-center">
            <img
              src={signupImg}
              alt="loginImg"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="h-full w-full flex flex-1 flex-col items-center justify-center gap-6 md:gap-10">
            <div className="w-full flex flex-col">
              <p className="text-xl md:text-3xl">Welcome to the Notes App!</p>
              <p className="text-sm md:text-base text-slate-500">
                Create free account
              </p>
            </div>
            <form
              onSubmit={handleSubmit(signup)}
              className="flex flex-col gap-6 md:gap-10 w-full"
            >
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Username"
                  leadingIcon={<User className="h-full" />}
                  className="min-h-10 md:h-14"
                  error={errors.userName}
                  errorMessage={
                    errors.userName?.type === "minLength" ||
                    errors.userName?.type === "maxLength"
                      ? "Username must be between 3-20 characters!"
                      : "Username is required!"
                  }
                  {...register("userName", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    pattern: /^[a-zA-Z0-9\s\-_\.]+$/,
                  })}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  leadingIcon={<Mail className="h-full" />}
                  className="min-h-10 md:h-14"
                  error={errors.email}
                  errorMessage={
                    errors.email?.type === "required"
                      ? "Email is required!"
                      : "Email is invalid!"
                  }
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.+]+$/,
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
                  className="min-h-10 md:h-14"
                  error={errors.password}
                  errorMessage={
                    ((errors.password?.type === "minLength" ||
                      errors.password?.type === "maxLength") &&
                      "Password must be between 8-20 characters!",
                    errors.password?.type === "required"
                      ? "Password is required!"
                      : "Password is too weak!")
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
                  children={"Sign Up"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {loader && <CustomLoader />}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Signup;
