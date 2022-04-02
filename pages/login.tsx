import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login, whoAmI } from "../services/user.service";
import styles from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: NextPage = () => {
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
      //   router.push('/login');
    }
  };

  const loginFunction = async (e: any) => {
    e.preventDefault();
    try {
      if (username.length > 0 && password.length > 0) {
        const data = await login(username, password);
        if (data) {
          toast.success("User successfully logged into system", {
            closeOnClick: true,
          });
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("User login failed, Please try again", {
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
              router.push("register");
            }}
            className="bg-green-600 rounded-md p-2"
          >
            Register
          </button>
        </div>
      </div>
      <main className={styles.main}>
        <div className="w-96 p-8 border-gray-200 border-2 rounded-md">
          <form
            onSubmit={(e) => loginFunction(e)}
            className="mb-8 flex flex-col"
          >
            <h2 className="text font-bold">Login Form</h2>
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
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
