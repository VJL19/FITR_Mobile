export interface INewsFeed {
  UserID: number;
  NewsfeedID: number;
  PostImage: string;
  PostTitle: string;
  PostDescription: string;
  PostDate: string;
  PostAuthor: string;
  Username: string;
  PostID: number;
}

export interface IComments {
  UserID: number;
  Username?: string;
  ProfilePic?: string;
  NewsfeedID: number;
  CommentID: number;
  CommentText: string;
}
