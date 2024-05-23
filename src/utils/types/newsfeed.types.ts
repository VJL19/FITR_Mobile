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

export interface IComments extends INewsFeed {
  UserID: number;
  ProfilePic?: string;
  NewsfeedID: number;
  CommentID: number;
  CommentText: string;
  CommentDate?: string;
}
