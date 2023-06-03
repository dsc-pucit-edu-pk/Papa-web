import React, { useContext, useEffect } from "react";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { GetEvents } from "../ApiCalls/GetEvents";

const Feed = () => {
  const dlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   const [events,]
  useEffect(() => {
    const getData = async () => {
      const data = await GetEvents();
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div>
      <Layout>
        <SearchBar />
        <div className="rounded-lg bg-[#fafafa]">
          {dlist.map((item) => (
            <FeedCard />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Feed;
