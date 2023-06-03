export const SignupApi = async ({ username, password, email }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    }
  );
  if (response.status !== 200) throw new Error("auth failed");
  const data = await response.json();
  console.log(data);

  return data;
};
