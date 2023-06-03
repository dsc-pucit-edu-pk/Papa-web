import { UserAuthData } from "./GetAuthStatus";

type Res = UserAuthData & { accessToken: string };
export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username, password }),
    }
  );
  if (response.status !== 200) throw new Error("auth failed");
  const data = (await response.json()) as Res;
  console.log(data);

  return data;
};
