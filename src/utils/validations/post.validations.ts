import Joi from "joi";
import { IPost } from "../types/post.types";

const postSchema = Joi.object<IPost>({
  PostTitle: Joi.string().required(),
  PostDescription: Joi.string().required(),
});

export default postSchema;
