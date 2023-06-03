import React from "react";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

const Feed = () => {
	const dlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<div>
			<Layout>
				<SearchBar />
				<div className="rounded-lg bg-slate-400">
					{dlist.map((item) => (
						<FeedCard />
					))}
				</div>
			</Layout>
		</div>
	);
};

export default Feed;
