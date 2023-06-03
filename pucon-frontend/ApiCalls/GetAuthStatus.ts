export type UserAuthData = {
  username: string;
  userId: string;
  email: string;
};
export const getAuthStatusApi = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/auth/status`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.status !== 200) throw new Error("auth failed");
  const data = (await response.json()) as UserAuthData;
  return data;
};
