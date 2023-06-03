import React from "react";

const FeedCard = () => {
	return (
		<>
			<div className="flex items-center justify-center py-8">
				<div className="rounded-lg w-[60%] h-auto bg-white border-2">
					<div className="rounded-lg w-[60%] mx-2 py-2 font-semibold text-3xl font">Name</div>
					<div className="rounded-lg w-[60%] mx-2 py-2 dark:text-gray-400">Detail of Event</div>

					<img className="rounded-lg object-cover h-80 w-[100%]" src="https://picsum.photos/200/300" />
				</div>
			</div>
		</>
	);
};

export default FeedCard;
