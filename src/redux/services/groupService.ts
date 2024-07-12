import {
  CreateGroupResponseType,
  DeleteGroupResponseType,
  GroupDetailResponseType,
  GroupListResponseType,
  RenameGroupResponseType,
  SearchUserResponseType,
} from "../../lib/types/group.types";
import { apiHelperFunction } from "../../utils/apiHelper";
const Base_url = import.meta.env.VITE_BASE_URL;
class groupService {
  static getInstance() {
    return new groupService();
  }

  createGroup = async ({
    groupName,
  }: {
    groupName: string;
  }): Promise<CreateGroupResponseType> => {
    try {
      const response: CreateGroupResponseType = await apiHelperFunction({
        method: "POST",
        url: `${Base_url}/group/create`,
        data: { groupName },
        includeAuth: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create group");
    }
  };

  getListOfGroups = async (): Promise<GroupListResponseType> => {
    try {
      const response: GroupListResponseType = await apiHelperFunction({
        method: "GET",
        url: `${Base_url}/group/grouplist`,
        includeAuth: true,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch group list");
    }
  };

  renameGroup = async ({
    newGroupName,
    group_id,
  }: {
    newGroupName: string;
    group_id: number;
  }): Promise<RenameGroupResponseType> => {
    try {
      const response: RenameGroupResponseType = await apiHelperFunction({
        method: "PUT",
        url: `${Base_url}/group/change-name/${group_id}`,
        data: {
          newGroupName,
        },
        includeAuth: true,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to rename group");
    }
  };

  deleteGroup = async ({
    group_id,
  }: {
    group_id: string;
  }): Promise<DeleteGroupResponseType> => {
    try {
      const response: DeleteGroupResponseType = await apiHelperFunction({
        method: "DELETE",
        url: `${Base_url}/group/delete/${group_id}`,
        includeAuth: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete group");
    }
  };

  groupInfo = async ({
    group_id,
  }: {
    group_id: string;
  }): Promise<GroupDetailResponseType> => {
    try {
      const response: GroupDetailResponseType = await apiHelperFunction({
        method: "GET",
        url: `${Base_url}/group/info/${group_id}`,
        includeAuth: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrive group info");
    }
  };
  revokeAdminRight = async ({
    group_id,
    user_id,
  }: {
    group_id: string;
    user_id: number;
  }): Promise<GroupDetailResponseType> => {
    try {
      const response: GroupDetailResponseType = await apiHelperFunction({
        method: "PUT",
        url: `${Base_url}/group/remove-admin/${group_id}`,
        includeAuth: true,
        data: {
          user_id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to revoke the admin rights");
    }
  };
  grantAdminRight = async ({
    group_id,
    user_id,
  }: {
    group_id: string;
    user_id: number;
  }): Promise<GroupDetailResponseType> => {
    try {
      const response: GroupDetailResponseType = await apiHelperFunction({
        method: "PUT",
        url: `${Base_url}/group/make-admin/${group_id}`,
        includeAuth: true,
        data: {
          user_id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to grants user rights");
    }
  };
  removeUserFromGroup = async ({
    group_id,
    user_id,
  }: {
    group_id: string;
    user_id: number;
  }): Promise<GroupDetailResponseType> => {
    try {
      const response: GroupDetailResponseType = await apiHelperFunction({
        method: "PUT",
        url: `${Base_url}/group/remove-user/${group_id}`,
        includeAuth: true,
        data: {
          user_id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to remove user form group");
    }
  };
  searchUserGroup = async ({
    email,
    phone,
  }: {
    email: string;
    phone: string;
  }): Promise<SearchUserResponseType> => {
    try {
      const response: SearchUserResponseType = await apiHelperFunction({
        method: "POST",
        url: `${Base_url}/group/search`,
        includeAuth: true,
        data: {
          email,
          phone,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search user form group");
    }
  };
  addUserToGroup = async ({
    group_id,
    user_id,
  }: {
    group_id: string;
    user_id: number;
  }): Promise<SearchUserResponseType> => {
    try {
      const response: SearchUserResponseType = await apiHelperFunction({
        method: "PUT",
        url: `${Base_url}/group/add-user/${group_id}`,
        includeAuth: true,
        data: {
          user_id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to search user form group");
    }
  };
}
export const GroupService = groupService.getInstance();
