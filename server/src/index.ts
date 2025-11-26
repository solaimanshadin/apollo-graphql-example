import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { comments, posts, replies, users } from './data';

const typeDefs = `#graphql
scalar Date
type User {
  id: ID!
  name: String!
  profilePicture: String
  posts: [Post]
}

type Post {
  id: ID!
  content: String!
  author: User!
  comments: [Comment]
  timestamp: Date
}

type Comment {
  id: ID!
  content: String!
  author: User!
  replies: [Reply]
  timestamp: Date
}

type Reply {
  id: ID!
  content: String!
  author: User!
    timestamp: Date
}

type Query {
  users: [User]
  posts: [Post]
  comments: [Comment]
  user(id: ID!): User
  post(id: ID!): Post
}

type Mutation {
  addPost(authorId: ID!, content: String!): Post
  addComment(authorId: ID!, postId: ID!, content: String!): Comment
  addReply(authorId: ID!, commentId: ID!, content: String!): Reply
}
`;

const resolvers = {
  /* ============================
     QUERIES
  ============================= */
  Query: {
    user: (_parent, args) => users.find((u) => u.id === args.id),
    post: (_parent, args) => posts.find((p) => p.id === args.id),

    users: () => users,
    posts: () => posts,
    comments: () => comments,
  },

  /* ============================
     MUTATIONS
  ============================= */
  Mutation: {
    addPost: (_parent, args) => {
      const newPost = {
        id: String(posts.length + 1),
        content: args.content,
        authorId: args.authorId,
        timestamp: new Date().toISOString(),
      };

      posts.push(newPost);
      return newPost;
    },

    addComment: (_parent, args) => {
      const newComment = {
        id: String(comments.length + 1),
        content: args.content,
        postId: args.postId,
        authorId: args.authorId,
        timestamp: new Date().toISOString(),
      };

      comments.push(newComment);
      return newComment;
    },

    addReply: (_parent, args) => {
      const newReply = {
        id: String(replies.length + 1),
        content: args.content,
        commentId: args.commentId,
        authorId: args.authorId,
        timestamp: new Date().toISOString(),
      };

      replies.push(newReply);
      return newReply;
    },
  },

  /* ============================
     NESTED RESOLVERS
  ============================= */
  User: {
    posts: (parent) => posts.filter((p) => p.authorId === parent.id),
  },

  Post: {
    author: (parent) => users.find((u) => u.id === parent.authorId),
    comments: (parent) => comments.filter((c) => c.postId === parent.id),
  },

  Comment: {
    author: (parent) => users.find((u) => u.id === parent.authorId),
    replies: (parent) => replies.filter((r) => r.commentId === parent.id),
  },

  Reply: {
    author: (parent) => users.find((u) => u.id === parent.authorId),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer();
