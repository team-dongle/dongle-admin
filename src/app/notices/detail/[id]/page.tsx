import NoticeDetail from "@/components/domain/notices/NoticeDetail";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const NoticeDetailPage = ({ params: { id } }: Props) => {
  return <NoticeDetail id={id} />;
};

export default NoticeDetailPage;
