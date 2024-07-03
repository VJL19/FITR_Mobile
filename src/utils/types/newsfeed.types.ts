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
  ProfilePic?: string;
}

export interface IComments extends INewsFeed {
  UserID: number;
  NewsfeedID: number;
  CommentID: number;
  CommentText: string;
  CommentDate?: string;
  commentCounts?: number;
}
