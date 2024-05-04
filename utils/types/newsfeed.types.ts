interface INewsFeed {
  UserID: number;
  NewsfeedID?: number;
  PostImage: string;
  PostTitle: string;
  PostDescription: string;
  PostLikes: number;
  PostIsLike: string;
  PostDate: string;
  PostAuthor: string;
}

interface IComments {
  UserID: number;
  NewsfeedID: number;
  CommentID: number;
  CommentText: string;
}
