// components/VoteButton.tsx

import { FC, useState, useEffect, useCallback } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "@/store/Auth";

interface VoteButtonProps {
	voterId?: string;
	postId: string;
	postType: "answer" | "question";
}

const VoteButton: FC<VoteButtonProps> = ({ voterId, postId, postType }) => {
	const { user } = useAuthStore();
	const [voteType, setVoteType] = useState<"upvote" | "downvote" | null>(null);
	const [voteCount, setVoteCount] = useState(0);

	useEffect(() => {
		let isMounted = true;
		const fetchVoteCount = async () => {
			try {
				const response = await axios.get(`/api/vote?postId=${postId}`);
				if (response.data.success && isMounted) {
					setVoteCount(response.data.netVotes);
				}
			} catch (error) {
				console.error("Error fetching vote count:", error);
			}
		};

		const fetchUserVote = async () => {
			if (!voterId || !postId) return;
			try {
				const userVoteResponse = await axios.get(
					`/api/getUserVote?postId=${postId}&voterId=${voterId}`
				);
				if (userVoteResponse.data.success && isMounted) {
					setVoteType(userVoteResponse.data.userVote);
				}
			} catch (error) {
				console.error("Error fetching user vote:", error);
			}
		};

		fetchVoteCount();
		fetchUserVote();

		return () => {
			isMounted = false;
		};
	}, [postId, voterId]);

	const handleVote = useCallback(
		async (type: "upvote" | "downvote") => {
			try {
				if (!user) alert("Log in to vote");
				const response = await axios.post("/api/vote", {
					voterId,
					postId,
					postType,
					voteType: type,
				});

				if (response.data.success) {
					setVoteType(response.data.userVote);
					setVoteCount(response.data.newVoteCount);
				} else {
					console.error("Error updating vote:", response.data.message);
				}
			} catch (error) {
				console.error("Error processing vote:", error);
			}
		},
		[voterId, postId, postType, user]
	);

	return (
		<div className="flex items-center space-x-2">
			<button
				onClick={() => handleVote("upvote")}
				className={`p-1 ${
					voteType === "upvote" ? "text-blue-600" : "text-gray-600"
				} hover:text-blue-700`}
				aria-label="Upvote"
				aria-pressed={voteType === "upvote"}
			>
				<ThumbsUp size={18} />
			</button>
			<span className="text-sm font-semibold">{voteCount}</span>
			<button
				onClick={() => handleVote("downvote")}
				className={`p-1 ${
					voteType === "downvote" ? "text-red-600" : "text-gray-600"
				} hover:text-red-700`}
				aria-label="Downvote"
				aria-pressed={voteType === "downvote"}
			>
				<ThumbsDown size={18} />
			</button>
		</div>
	);
};

export default VoteButton;
