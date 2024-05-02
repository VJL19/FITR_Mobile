import Joi from "joi";
import { IPost } from "../types/post.types";

const postSchema = Joi.object<IPost>({
  UserID: Joi.number().required(),
  PostImage: Joi.string().required(),
  PostTitle: Joi.string().required(),
  PostDescription: Joi.string().required(),
  PostDate: Joi.string().required(),
  PostAuthor: Joi.string().required(),
});

export default postSchema;
