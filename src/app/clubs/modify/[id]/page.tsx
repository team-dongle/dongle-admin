import ClubForm from "@/components/domain/clubs/ClubForm";
import React from "react";

interface Params {
  params: {
    id: number;
  };
}

const ClubModifyPage = ({ params }: Params) => {
  const { id } = params;
  return <ClubForm clubId={id} type="modify" />;
};

export default ClubModifyPage;
