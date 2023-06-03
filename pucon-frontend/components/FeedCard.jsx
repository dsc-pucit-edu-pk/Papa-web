import React, { useContext } from "react";
import { globalContext } from "../store/GlobalContext";
const FeedCard = ({ event }) => {
  const {
    globalData: { email },
  } = useContext(globalContext);
  const alreadyJoined = event.participants.includes(email);
  const addToWishlist = async () => {
    if (event.isFavourite) return;
    const res = await fetch(
      `http://localhost:8080/api/events/addFavouriteEvent`,
      {
        method: "POST",
        body: JSON.stringify({ eventId: event._id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    document.location.reload();
  };
  const joinEventHandler = async () => {
    if (alreadyJoined) return;
    const res = await fetch(
      `http://localhost:8080/api/events/joinEvent/${event._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    document.location.reload();
  };
  return (
    <>
      <div className="flex items-center justify-center py-8">
        <div className="rounded-lg w-[60%] h-auto bg-white border-2">
          <div className="rounded-lg w-[60%] mx-2 py-2 font-semibold text-3xl font">
            {event.title}
          </div>
          <p
            onClick={joinEventHandler}
            style={{
              backgroundColor: "red",
              borderRadius: "2px",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            {alreadyJoined ? "Already Joined" : "Join Event"}
          </p>
          <p
            onClick={addToWishlist}
            style={{
              backgroundColor: "red",
              borderRadius: "2px",
              display: "inline-block",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            {event.isFavourite ? "Already in Wishlist" : "Add to Wishlist"}
          </p>
          <div className="rounded-lg w-[60%] mx-2 py-2 dark:text-gray-400">
            {event.description}
          </div>

          <img
            className="rounded-lg object-cover h-80 w-[100%]"
            src={event.poster_url}
          />
          <h1>Participants:</h1>
          {event.participants.map((e) => (
            <p>{e}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedCard;
