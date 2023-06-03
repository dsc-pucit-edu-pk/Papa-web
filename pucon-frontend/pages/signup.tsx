import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { SignupApi } from "../ApiCalls/Signup";

const login = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await SignupApi({
        password,
        username,
        email,
      });
      router.push("/login");
    } catch (error) {
      alert("signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen bg-[url('/header1.jpg')]">
      <div className="absolute top-0 right-0 w-full h-full bg-[#2a2929] bg-opacity-30"></div>
      <form
        autoComplete="off"
        className="w-[40%] h-screen bg-black bg-opacity-70 relative z-50 min-w-[500px] flex items-cente flex-col items-center pt-12"
      >
        <h1 className="text-4xl text-white text-center py-5 font-semibold">
          Register
        </h1>
        <div className="w-3/4  mt-2">Username</div>
        <input
          type="text"
          className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
          placeholder="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="w-3/4  mt-2">Email</div>
        <input
          type="text"
          className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-3/4 mt-3">password</div>

        <input
          type="password"
          placeholder="password"
          className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="w-3/4   mt-3">confirm password</div>

        <input
          type="password"
          placeholder="confirm password"
          className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {loading && <p>loading...</p>}
        <div
          className="w-full flex justify-center"
          onClick={(e: any) => submitHandler(e)}
        >
          <button className="w-3/4 mt-10" disabled={loading}>
            signup
          </button>
        </div>
        <div className="mt-3">
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default login;
