import React from "react";

const FeedCard = () => {
	return (
		<>
			<div className="flex items-center justify-center py-8">
				<div className="rounded-lg w-[60%] h-auto bg-blue-100">
					<div className="rounded-lg w-[60%] mx-2 py-2">Name</div>
					<div className="rounded-lg w-[60%] mx-2 py-2">Detail</div>
					<img className="rounded-lg object-cover h-80 w-[100%]" src="https://picsum.photos/200/300" />
				</div>
			</div>
		</>
	);
};

export default FeedCard;
