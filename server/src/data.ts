export const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    profilePicture: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Bob Smith',
    profilePicture: 'https://i.pravatar.cc/150?img=34',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    profilePicture: 'https://i.pravatar.cc/150?img=56',
  },
  {
    id: '4',
    name: 'Diana Prince',
    profilePicture: 'https://i.pravatar.cc/150?img=78',
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    profilePicture: 'https://i.pravatar.cc/150?img=90',
  },
];

export const posts = [
  {
    id: '1',
    content:
      'Just wrapped up a successful team workshop on scaling microservices! 🚀',
    authorId: '1',
    timestamp: '2024-06-10T09:15:00Z',
  },
  {
    id: '2',
    content:
      'Completed a deep dive into GraphQL best practices. The flexibility is amazing!',
    authorId: '2',
    timestamp: '2024-06-11T11:00:00Z',
  },
  {
    id: '3',
    content:
      'Thrilled to share that I’ve started a new position as a Frontend Engineer at TechNova!',
    authorId: '3',
    timestamp: '2024-06-12T08:45:00Z',
  },
  {
    id: '4',
    content:
      'Experimenting with AI-assisted UI design. The productivity boost is unreal!',
    authorId: '4',
    timestamp: '2024-06-13T14:20:00Z',
  },
  {
    id: '5',
    content:
      'Mentored two junior devs this week. Their progress is inspiring! 💡',
    authorId: '5',
    timestamp: '2024-06-14T17:50:00Z',
  },
];

export const comments = [
  {
    id: '1',
    content:
      'Sounds awesome, Alice! Microservices workshops are always full of learning.',
    authorId: '2',
    postId: '1',
    timestamp: '2024-06-10T10:00:00Z',
  },
  {
    id: '2',
    content: 'Great work! Did you explore federation as well?',
    authorId: '3',
    postId: '2',
    timestamp: '2024-06-11T12:30:00Z',
  },
  {
    id: '3',
    content: 'Congratulations on the new role, Charlie! Wishing you the best.',
    authorId: '4',
    postId: '3',
    timestamp: '2024-06-12T09:15:00Z',
  },
  {
    id: '4',
    content:
      'AI tools have changed the workflow completely. What tools are you trying?',
    authorId: '5',
    postId: '4',
    timestamp: '2024-06-13T15:10:00Z',
  },
  {
    id: '5',
    content:
      'That’s amazing, Ethan! Mentorship is such an important part of growth.',
    authorId: '1',
    postId: '5',
    timestamp: '2024-06-14T18:30:00Z',
  },
  {
    id: '6',
    content:
      "We should sync sometime, Alice. I'd love to hear more about your workshop.",
    authorId: '3',
    postId: '1',
    timestamp: '2024-06-10T11:45:00Z',
  },
  {
    id: '7',
    content: 'GraphQL has been a game changer for my team too!',
    authorId: '4',
    postId: '2',
    timestamp: '2024-06-11T13:10:00Z',
  },
];

export const replies = [
  {
    id: '1',
    commentId: '1',
    authorId: '1',
    content: 'Thanks, Bob! We covered event-driven communication as well.',
    timestamp: '2024-06-10T10:20:00Z',
  },
  {
    id: '2',
    commentId: '2',
    authorId: '2',
    content: 'Yes! Federation was one of the most exciting parts of the study.',
    timestamp: '2024-06-11T12:45:00Z',
  },
  {
    id: '3',
    commentId: '4',
    authorId: '4',
    content:
      'I’ve been experimenting with Figma AI and Uizard. Really promising!',
    timestamp: '2024-06-13T15:40:00Z',
  },
  {
    id: '4',
    commentId: '6',
    authorId: '1',
    content: 'Absolutely! Let’s catch up next week, Charlie.',
    timestamp: '2024-06-10T12:00:00Z',
  },
  {
    id: '5',
    commentId: '7',
    authorId: '2',
    content: 'Totally agree! Especially with schema stitching improvements.',
    timestamp: '2024-06-11T13:25:00Z',
  },
];
