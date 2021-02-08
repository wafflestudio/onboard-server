import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Department, NoticeTag } from '../department/department.entity';

@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 10000 })
  content: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ default: false })
  isPinned: boolean;

  @Column()
  link: string;

  @ManyToOne(() => Department, (department) => department.notices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  department!: Department;

  @OneToMany(() => UserNotice, (userNotice) => userNotice.notice)
  userNotices: UserNotice[];

  @OneToMany(() => File, (file) => file.notice)
  files: File[];

  @OneToMany(() => NoticeTag, (noticeTag) => noticeTag.notice)
  noticeTags: NoticeTag[];
}

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Notice, (notice) => notice.files, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  notice!: Notice;
}

@Entity()
export class UserNotice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isScrapped: boolean;

  @ManyToOne(() => User, (user) => user.userNotices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne(() => Notice, (notice) => notice.userNotices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  notice!: Notice;
}
