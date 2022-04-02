import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { register, whoAmI } from "../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Home.module.css";

const Register: NextPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const data: any = await whoAmI();
      if (data.data) {
        toast.success("User successfully logged from token", {
          closeOnClick: true,
        });
        router.push("/");
      }
    } catch (error) {
      // toast.error("Something went wrong. Please Try again", {
      //   closeOnClick: true,
      // });
    }
  };

  const RegisterFunction = async (e: any) => {
    e.preventDefault();
    try {
      if (username.length > 0 && password.length > 0) {
        const data = await register(username, password);
        if (data) {
          toast.success("User successfully registered", {
            closeOnClick: true,
          });
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please Try again", {
        closeOnClick: true,
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="bg-yellow-300 py-6 flex flex-row justify-between">
        <h3 className="text font-bold ml-8 mt-2">TODO APP</h3>
        <div className="flex flex-row mr-8">
          <button
            onClick={() => {
              router.push("login");
            }}
            className="bg-green-600 rounded-md p-2"
          >
            Login
          </button>
        </div>
      </div>
      <main className={styles.main}>
        <div className="w-96 p-8 border-gray-200 border-2 rounded-md">
          <form
            onSubmit={(e) => RegisterFunction(e)}
            className="mb-8 flex flex-col"
          >
            <h2 className="text font-bold">Register Form</h2>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <input
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="p-2 border-gray-500 border-2 rounded-md mb-2"
            />
            <button type="submit" className="bg-yellow-400 rounded-md p-2">
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
