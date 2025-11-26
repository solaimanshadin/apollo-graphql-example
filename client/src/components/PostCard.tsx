import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { Post } from "../types";
import { CommentCard } from "./CommentCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";

interface PostCardProps {
  post: Post;
}

const ADD_COMMENT = gql`
  mutation AddComment($authorId: ID!, $postId: ID!, $content: String!) {
    addComment(authorId: $authorId, postId: $postId, content: $content) {
      id
      content
      author {
        id
        name
      }
      timestamp
    }
  }
`;

const currentUserId = 1; // Simulated current user ID
export const PostCard: React.FC<PostCardProps> = ({
  post,
}) => {
  const [newCommentText, setNewCommentText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addComment] = useMutation<any>(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // Update Apollo cache for the comments of this post
      cache.modify({
        id: cache.identify({ __typename: "Post", id: post.id }),
        fields: {
          comments(existingCommentRefs = []) {
            const newCommentRef = cache.writeFragment({
              data: addComment,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  content
                  author { id name }
                  timestamp
                }
              `,
            });
            return [...existingCommentRefs, newCommentRef];
          },
        },
      });
    },
    onCompleted: () => {
      setNewCommentText(''); // clear input
    },
  });

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    addComment({ variables: { authorId: 1, postId: post.id, content: newCommentText } });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post?.author?.profilePicture} alt={post?.author?.name} />
          <AvatarFallback>{post?.author?.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{post?.author?.name}</p>
          <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <p>{post.content}</p>
        <div className="mt-4 space-y-4">
          {post?.comments?.map((comment) => (
            <CommentCard
              currentUserId={currentUserId}
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full"
            placeholder="Write a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={handleAddComment}
          >
            Comment
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
