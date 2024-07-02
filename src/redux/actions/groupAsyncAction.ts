import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupService } from "../services/groupService";
import {
  CreateGroupResponseType,
  DeleteGroupResponseType,
  GroupDetailResponseType,
  GroupListResponseType,
  RenameGroupResponseType,
} from "../../lib/types/group.types";

export const createGroupAction = createAsyncThunk(
  "createGroupAction",
  async ({ groupName }: { groupName: string }, thunkAPI) => {
    const response: CreateGroupResponseType = await GroupService.createGroup({
      groupName,
    });
    if (response) {
      thunkAPI.dispatch(getListOfGroupsAction());
      return response.data;
    }
    throw new Error("Create new Group failed");
  }
);
export const getListOfGroupsAction = createAsyncThunk(
  "getListOfGroupsAction",
  async () => {
    const response: GroupListResponseType =
      await GroupService.getListOfGroups();
    if (response) {
      return response.data;
    }
    throw new Error("Fetch list of group failed");
  }
);
export const renameGroupAction = createAsyncThunk(
  "renameGroupAction",
  async (
    {
      newGroupName,
      group_id,
    }: {
      newGroupName: string;
      group_id: number;
    },
    thunkAPI
  ) => {
    const response: RenameGroupResponseType = await GroupService.renameGroup({
      newGroupName,
      group_id,
    });
    if (response) {
      thunkAPI.dispatch(getListOfGroupsAction());
      thunkAPI.dispatch(getGroupInfoAction({ group_id: group_id.toString() }));
      return response.data;
    }
    throw new Error("Rename failed");
  }
);
export const deleteGroupAction = createAsyncThunk(
  "deleteGroupAction",
  async ({ group_id }: { group_id: string }, thunkAPI) => {
    const response: DeleteGroupResponseType = await GroupService.deleteGroup({
      group_id,
    });
    if (response) {
      thunkAPI.dispatch(getListOfGroupsAction());
      return response;
    }

    throw new Error("Delete Group failed");
  }
);

export const getGroupInfoAction = createAsyncThunk(
  "getGroupInfoAction",
  async ({ group_id }: { group_id: string }) => {
    const response: GroupDetailResponseType = await GroupService.groupInfo({
      group_id,
    });
    if (response) {
      return response.data;
    }
    throw new Error("Delete Group failed");
  }
);

export const revokeAdminRightsAction = createAsyncThunk(
  "revokeAdminRightsAction",
  async (
    { group_id, user_id }: { group_id: string; user_id: number },
    thunkAPI
  ) => {
    const response: GroupDetailResponseType =
      await GroupService.revokeAdminRight({
        group_id,
        user_id,
      });
    if (response) {
      thunkAPI.dispatch(getGroupInfoAction({ group_id }));
      return response.data;
    }
    throw new Error("Delete Group failed");
  }
);

export const grantAdminRightsAction = createAsyncThunk(
  "grantAdminRightsAction",
  async (
    { group_id, user_id }: { group_id: string; user_id: number },
    thunkAPI
  ) => {
    const response: GroupDetailResponseType =
      await GroupService.grantAdminRight({
        group_id,
        user_id,
      });
    if (response) {
      thunkAPI.dispatch(getGroupInfoAction({ group_id }));
      return response.data;
    }
    throw new Error("Delete Group failed");
  }
);
export const removeUserFromGroupAction = createAsyncThunk(
  "removeUserFromGroupAction",
  async (
    { group_id, user_id }: { group_id: string; user_id: number },
    thunkAPI
  ) => {
    const response: GroupDetailResponseType =
      await GroupService.removeUserFromGroup({
        group_id,
        user_id,
      });
    if (response) {
      thunkAPI.dispatch(getGroupInfoAction({ group_id }));
      return response.data;
    }
    throw new Error("Delete Group failed");
  }
);
