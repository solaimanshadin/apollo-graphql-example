import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from "react";
import { PostCard } from "./components/PostCard";
import { Post } from "./types";

const GET_POSTS = gql`
query GetPosts{
  posts {
    id,
    content,
    author {
      name,
      profilePicture
    }
    comments {
      content,
      id
      author {
        id,
        name,
        profilePicture
      }
      replies {
        content,
        author {
          id,
          name,
          profilePicture
        }
        timestamp
      }
      timestamp
    }
    timestamp
  }
}
`

export const App: React.FC = () => {
  const { data } = useQuery<{ posts: Post[] }>(GET_POSTS)

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {data?.posts.map((post) => {

        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};
