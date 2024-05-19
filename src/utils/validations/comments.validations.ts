import Joi from "joi";
import { IComments } from "../types/newsfeed.types";

const commentSchema = Joi.object<IComments>({
  CommentText: Joi.string().required(),
});

export default commentSchema;
