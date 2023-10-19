/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import Error from "../shared/Error";

interface CustomError {
  status: number;
  data: {
    message: string;
  };

  isUnhandledError: boolean;
  meta: {
    request: any;
    response: any;
  };
}

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signUp, { data: responseData, isError, isLoading, isSuccess, error }] =
    useSignUpMutation();

  const router = useRouter();
  //signUp user
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repetPassword) {
      Swal.fire("Oops!", `Password didn't match`, "error");
      return;
    } else {
      const data = {
        name: {
          firstName,
          lastName,
        },
        email,
        phoneNumber: phone,
        password,
        address,
      };
      signUp(data);
   
    }
  };

  useEffect(() => {
    if (isError || error) {
      setErrorMessage((error as CustomError)?.data?.message);
    }
  }, [error, isError]);

  useEffect(() => {
    if (responseData?.success) {
      router.push("/login");
    }
  }, [responseData]);

  return (
    <div className="h-screen flex">
      <div className="flex flex-col justify-center items-center w-full pb-4 bg-gray-300">
        <div className="bg-gray-100 shadow-lg py-4 md:w-2/5 flex flex-col justify-center items-center rounded mt-4">
          <div className="flex flex-col sm:p-10 md:pt-6 md:pb-4 rounded-md text-gray-800 w-full">
            <div className="mb-4 text-center">
              <h1 className="mb-3 mt-2 text-3xl font-bold uppercase">
                Create Account
              </h1>
            </div>
            <form
              className="ng-untouched ng-pristine ng-valid"
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex mb-4 w-full">
                    <Input
                      type="text"
                      className=""
                      placeholder="First Name"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex mb-4 w-full">
                    <Input
                      type="text"
                      className=""
                      placeholder="Last Name"
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex mb-4">
                  <Input
                    type="email"
                    className=""
                    placeholder="Your Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <Input
                    type="address"
                    className=""
                    placeholder="Your Address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <Input
                    type="text"
                    className=""
                    placeholder="Phone number"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <Input
                    type="password"
                    required
                    className=""
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex ">
                  <Input
                    type="password"
                    required
                    className=""
                    placeholder="Repeat Your Password"
                    value={repetPassword}
                    onChange={(e) => setRepetPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <div>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-gray-300 mt-8 flex items-center justify-center"
                  >
                    <p>Sign Up</p>
                  </Button>
                  <div>{isError && <Error message={errorMessage} />}</div>
                </div>
              </div>
            </form>
          </div>
          <p className="px-6 text-sm text-center align-bottom pb-2 text-gray-700">
            Already have an account?
            <Link
              href="/login"
              className="hover:underline font-bold ml-1 text-sky-500"
            >
              Please Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
