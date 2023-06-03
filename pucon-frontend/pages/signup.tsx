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
			<img
				src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
				alt=""
				className="w-screen h-screen object-cover absolute top-0 left-0"
			/>
			<div className="absolute top-0 right-0 w-full h-full bg-[#2a2929] bg-opacity-30"></div>
			<form
				autoComplete="off"
				className="w-[40%] h-screen bg-black bg-opacity-70 relative z-50 min-w-[500px] flex items-cente flex-col items-center pt-12">
				<h1 className="text-4xl text-white text-center py-5 font-semibold">Register</h1>
				<div className="w-3/4 text-slate-300 mt-2">Username</div>
				<input
					type="text"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					placeholder="username"
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div className="w-3/4 text-slate-300 mt-2">Email</div>
				<input
					type="text"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					placeholder="email"
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div className="w-3/4 text-slate-300 mt-3">password</div>

				<input
					type="password"
					placeholder="password"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="w-3/4 text-slate-300  mt-3">confirm password</div>

				<input
					type="password"
					placeholder="confirm password"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					value={confirmPassword}
					required
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				{loading && <p className="text-slate-300">loading...</p>}
				<div className="w-full flex justify-center" onClick={(e: any) => submitHandler(e)}>
					<button className="w-3/4 text-slate-300 border-2 mt-10" disabled={loading}>
						signup
					</button>
				</div>
				<div className="mt-3">
					<p className="text-slate-300">
						Already have an account?{" "}
						<Link className="text-slate-300" href="/login">
							Login
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default login;
