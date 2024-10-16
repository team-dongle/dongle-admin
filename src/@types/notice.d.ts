interface INotice {
  _id: number;
  title: string;
  content?: string;
  attachment?: IFile[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  author?: number;
}

interface NoticeFormType {
  title: string;
  content?: string;
  attachment?: IFile[];
}
