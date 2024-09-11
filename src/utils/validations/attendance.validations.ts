import Joi from "joi";
import { IAttendanceDate } from "utils/types/attendance.types";

const attendanceDateSchema = Joi.object<IAttendanceDate>({
  attendanceDate: Joi.string().required(),
});

export default attendanceDateSchema;
