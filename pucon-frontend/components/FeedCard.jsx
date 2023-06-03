import React from "react";

const FeedCard = () => {
	return (
		<>
			<div className="rounded-lg w-auto h-auto bg-slate-300">
				<div className="rounded-lg w-80">Name</div>
				<div className="rounded-lg w-80">Detail</div>
				<img className="rounded-lg object-cover h-48 w-80" src="https://picsum.photos/200/300" />
			</div>
		</>
	);
};

export default FeedCard;
