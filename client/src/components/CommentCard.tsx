import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { Comment } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentCardProps {
  comment: Comment;
  currentUserId: string | number;
}

const ADD_REPLY = gql`
  mutation AddReply($authorId: ID!, $commentId: ID!, $content: String!) {
    addReply(authorId: $authorId, commentId: $commentId, content: $content) {
      id
      content
      author { id name }
      timestamp
    }
  }
`;


export const CommentCard: React.FC<CommentCardProps> = ({ comment, currentUserId }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addReply] = useMutation<any>(ADD_REPLY, {
    update(cache, { data }) {
      if (!data) return;
      const newReply = data.addReply;

      cache.modify({
        id: cache.identify({ __typename: "Comment", id: comment.id }),
        fields: {
          replies(existingReplies = []) {
            const newRef = cache.writeFragment({
              data: newReply,
              fragment: gql`
                fragment NewReply on Reply {
                  id
                  content
                  author { id name }
                  timestamp
                }
              `,
            });
            return [...existingReplies, newRef];
          },
        },
      });
    },
  });

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    addReply({ variables: { authorId: currentUserId, commentId: comment.id, content: replyText } });
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="flex flex-col border-l-2 border-gray-200 pl-4 ml-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={comment.author?.profilePicture} alt={comment.author?.name} />
          <AvatarFallback>{comment.author?.name[0]}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{comment.author?.name}</p>
        <p className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
      </div>

      <p className="ml-10 mt-1">{comment.content}</p>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={reply.author?.profilePicture} alt={reply.author?.name} />
                <AvatarFallback>{reply.author?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{reply.author?.name}</p>
                <p className="ml-2">{reply.content}</p>
                <p className="text-sm text-gray-500">{new Date(reply.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReplyBox ? (
        <div className="ml-10 mt-2 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleReplySubmit}>
              Reply
            </button>
            <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setShowReplyBox(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="ml-10 mt-2 text-sm text-blue-500" onClick={() => setShowReplyBox(true)}>
          Reply
        </button>
      )}
    </div>
  );
};
