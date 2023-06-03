export const GetEvents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/events/allEvents`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.status !== 200) throw new Error("auth failed");
  const data = await response.json();
  return data;
};
