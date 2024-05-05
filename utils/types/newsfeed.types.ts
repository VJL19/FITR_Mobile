export interface INewsFeed {
  UserID: number;
  NewsfeedID: number;
  PostImage: string;
  PostTitle: string;
  PostDescription: string;
  PostLikes: number;
  PostIsLike: string;
  PostDate: string;
  PostAuthor: string;
  Username: string;
}

export interface IComments {
  UserID: number;
  Username?: string;
  ProfilePic?: string;
  NewsfeedID: number;
  CommentID: number;
  CommentText: string;
}
