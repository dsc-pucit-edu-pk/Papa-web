import React, { useContext, useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { GetEvents } from "../ApiCalls/GetEvents";
import { globalContext } from "../store/GlobalContext";
import { useRouter } from "next/router";

const Feed = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {
    globalData: { loggedIn },
  } = useContext(globalContext);
  const [showWishList, setShowWishList] = useState(false);
  const wishHandler = () => {
    setShowWishList(!showWishList);
  };
  const router = useRouter();
  if (!loggedIn) {
    router.push("/login");
    return;
  }
  useEffect(() => {
    const getData = async () => {
      const data = await GetEvents();
      console.log(data);
      setEvents(data);
    };
    getData();
  }, []);
  const searchHandler = (text) => {
    setSearchText(text);
  };

  const data = events.filter((item) => {
    if (showWishList) {
      return item.isFavourite;
    }
    if (searchText) {
      return item.title.toLowerCase().startsWith(searchText.toLowerCase());
    }

    return true;
  });
  return (
    <div>
      <Layout>
        <SearchBar searchHandler={searchHandler} />
        <label htmlFor="check">Show my wish list</label>
        <input
          value={showWishList}
          id="check"
          type="checkbox"
          onChange={wishHandler}
        />
        <div className="rounded-lg bg-[#fafafa]">
          {data.map((item) => (
            <FeedCard event={item} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Feed;
