interface IClub {
  _id: number;
  name: string;
  contact: string;
  applyUrl: string;
  thumbnail?: string;
  location: string;
  sns: string;
  logo?: string;
  detail?: string;
  recruitPeriod: string;
  isRecruiting: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  category?: {
    _id: number;
    name: string;
  };
  owner?: {
    _id: number;
    name: string;
  };
}

interface ClubFormType {
  logo?: string;
  name: string;
  location: string;
  contact: string;
  sns?: string;
  applyUrl: string;
  categoryId?: string;
  recruitPeriod?: Date;
  isRecruiting: boolean;
  detail: string;
  ownerId?: string;
}
