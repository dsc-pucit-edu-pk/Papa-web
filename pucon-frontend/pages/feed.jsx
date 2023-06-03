import React from "react";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

const Feed = () => {
	return (
		<div>
			<Layout>
				<SearchBar />
				<FeedCard />
			</Layout>
		</div>
	);
};

export default Feed;
