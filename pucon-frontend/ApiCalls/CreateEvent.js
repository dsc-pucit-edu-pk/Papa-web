export const CreateEvent = async (dataa) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/events/createEvent`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataa),
    }
  );
  if (response.status !== 200) throw new Error("event failed to create");
  const data = await response.json();
  return data;
};
