import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddTODO } from "../components/add-todo";
import { OneTODO } from "../components/one-todo";
import { login, whoAmI } from "../services/user.service";
import styles from "../styles/Home.module.css";

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
        console.log(data);
      if (data.data) {
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
        if(data){
            router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-96 p-8 border-gray-200 border-2 rounded-md">
      <form onSubmit={(e) => loginFunction(e)} className="mb-8 flex flex-col">
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
          type="text"
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
  );
};

export default Login;
