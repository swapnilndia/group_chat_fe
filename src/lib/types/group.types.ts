export type GroupListData = {
  group_member_id: number;
  user_id: number;
  group_id: number;
  is_admin: number;
  "Group.group_name": string;
}[];
export type GroupListResponseType = {
  status: number;
  message: string;
  data: GroupListData;
};
export type RenameGroupResponseType = {
  status: number;
  message: string;
  data: Record<string, never>;
};

export type CreateGroupResponseType = {
  status: number;
  message: string;
  data: {
    group_id: number;
    group_name: string;
    created_by: 1;
    updatedAt: string;
    createdAt: string;
  };
};
export type DeleteGroupResponseType = {
  status: number;
  message: string;
  data: Record<string, never>;
};

export type GroupMember = {
  group_member_id: number;
  user_id: number;
  group_id: number;
  is_admin: boolean;
};

export type User = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  GroupMember: GroupMember;
};

export type GroupDetailDataType = {
  group_id: number;
  group_name: string;
  created_by: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Users: User[];
  isUserGroupAdmin: boolean;
};

export type GroupDetailResponseType = {
  status: number;
  message: string;
  data: GroupDetailDataType;
};

export type SearchUserType = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string; // Use Date if you want to handle it as a Date object
  updatedAt: string; // Use Date if you want to handle it as a Date object
};

export type SearchUserResponseType = {
  status: number;
  message: string;
  data: SearchUserType;
};
