import { Request } from 'express';
import { User } from '../user/user.entity';
import { Department, Tag, UserTag } from '../department/department.entity';
import { NoticePaginationDto } from 'src/notice/dto/noticePagination.dto';

export class Payload {
  username!: string;
  id!: number;
}

export interface UserRequest extends Request {
  user: User;
}

export interface PreFollow {
  department: Department;
  tag: Tag;
  user: User;
  userTag?: UserTag;
}

export interface PreQuery {
  query: NoticePaginationDto;
  user: User;
  departmentId?: number;
}
