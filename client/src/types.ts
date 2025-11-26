export interface User {
  id: string;
  name: string;
  profilePicture?: string;
  posts?: Post[];
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  timestamp: string;
  author?: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  timestamp: string;
  author?: User;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  commentId: string;
  timestamp: string;
  author?: User;
}
