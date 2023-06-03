import { loginApi } from "@/ApiCalls/Login";
import { globalContext } from "@/store/GlobalContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Link from "next/link";

const login = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const { setAuthData } = useContext(globalContext);
	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			const data = await loginApi({ password, username });
			console.log(data);

			localStorage.setItem("token", data.accessToken);
			setAuthData({
				userId: data.userId,
				username: data.username,
				loggedIn: true,
			});
			router.push("/");
		} catch (error) {
			alert("login failed");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-screen h-screen bg-[url('/header1.jpg')]">
			<img
				src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
				alt=""
				className="w-screen h-screen object-cover absolute top-0 left-0"
			/>
			<div className="absolute top-0 right-0 w-full h-full bg-[#2a2929] bg-opacity-30"></div>
			<form
				autoComplete="off"
				className="w-[40%] h-screen bg-black bg-opacity-70 relative z-50 min-w-[500px] flex items-cente flex-col items-center pt-32">
				<h1 className="text-4xl text-white text-center py-5 font-semibold">Login</h1>
				<div className="w-3/4 text-slate-300 mt-10">Username</div>
				<input
					type="text"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					placeholder="username"
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div className="w-3/4  text-slate-300 mt-3">password</div>

				<input
					type="password"
					placeholder="password"
					className="block mx-10 w-3/4 h-12 bg-transparent border-b-2 border-white text-white"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				{loading && <p className="text-slate-300">loading...</p>}
				<div className="w-3/4" onClick={(e: any) => submitHandler(e)}>
					<button className="w-full mt-10 border-2 text-slate-300" disabled={loading}>
						Login
					</button>
				</div>
				<div className="mt-3">
					<p className="text-slate-300">
						Don't have an account?
						<Link className="text-slate-300" href="/signup">
							{" "}
							Sign up
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default login;
