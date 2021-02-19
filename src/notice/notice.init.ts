import { Department, NoticeTag, Tag } from '../department/department.entity';
import { NOTICES, FILES } from './constansts';
import { Notice, File } from './notice.entity';
export const noticeInit = async (): Promise<void> => {
  for (const noticeData of NOTICES) {
    let notice: Notice | undefined = await Notice.findOne({
      title: noticeData.title,
    });
    if (!notice) {
      const departmentObj: Department | undefined = await Department.findOne({
        name: noticeData.department,
      });
      if (departmentObj) {
        notice = Notice.create({
          title: noticeData.title,
          preview: noticeData.preview,
          content: noticeData.content,
          createdAt: new Date(noticeData.createdAt),
          department: departmentObj,
          isPinned: noticeData.isPinned,
          link: noticeData.link,
        });
        notice.cursor = notice.createdAt.getTime();
        await Notice.save(notice); // save notice to generate id
        notice.cursor = notice.createdAt.getTime() + (notice.id % 1000);
        await Notice.save(notice);

        noticeData.noticeTags.map(async (tagName) => {
          const tag: Tag | undefined = await Tag.findOne({
            name: tagName,
            department: departmentObj,
          });
          if (tag) {
            await NoticeTag.save(
              NoticeTag.create({ notice: notice, tag: tag }),
            );
          }
        });
      }
    }
  }

  for (const fileData of FILES) {
    const { name, link, noticeTitle } = fileData;
    const notice: Notice | undefined = await Notice.findOne({
      title: noticeTitle,
    });
    const file: File | undefined = await File.findOne({
      name: name,
      notice: notice,
    });
    if (!file) {
      await File.save(File.create({ name: name, link: link, notice: notice }));
    }
  }
};
