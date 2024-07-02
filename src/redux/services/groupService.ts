import {
  CreateGroupResponseType,
  DeleteGroupResponseType,
  GroupDetailResponseType,
  GroupListResponseType,
  RenameGroupResponseType,
} from "../../lib/types/group.types";
import { apiHelperFunction } from "../../utils/apiHelper";

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
        url: "http://localhost:3000/api/v1/group/create",
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
        url: "http://localhost:3000/api/v1/group/grouplist",
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
        url: `http://localhost:3000/api/v1/group/change-name/${group_id}`,
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
        url: `http://localhost:3000/api/v1/group/delete/${group_id}`,
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
        url: `http://localhost:3000/api/v1/group/info/${group_id}`,
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
        url: `http://localhost:3000/api/v1/group/remove-admin/${group_id}`,
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
        url: `http://localhost:3000/api/v1/group/make-admin/${group_id}`,
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
        url: `http://localhost:3000/api/v1/group/remove-user/${group_id}`,
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
}
export const GroupService = groupService.getInstance();
