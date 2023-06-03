export const DeleteEventt = async (dataa) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/events/deleteEvent/${dataa._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataa),
    }
  );
  if (response.status !== 200) throw new Error("event failed to delete");
  const data = await response.json();
  return data;
};
