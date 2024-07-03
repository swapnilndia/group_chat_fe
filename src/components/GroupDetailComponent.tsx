import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  selectedGroupId,
  selectedGroupInfo,
} from "../redux/reducers/groupSlice";
import { useEffect, useState } from "react";
import {
  deleteGroupAction,
  getGroupInfoAction,
} from "../redux/actions/groupAsyncAction";
import { AppDispatch } from "../redux/appStore";
import RenameGroupDialog from "./RenameGroupDialog";
import AddUserToGroup from "./AddUserToGroup";
import GroupUsersList from "./GroupUsersList";
import CancelIcon from "@mui/icons-material/Cancel";

const GroupDetailComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedGroupDetail = useSelector(selectedGroupInfo);
  const selectGroupId = useSelector(selectedGroupId);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [viewMessage, setViewMessage] = useState(true);

  const handleRenameClickOpen = () => {
    setOpenRenameDialog(true);
  };
  const handleSearchClickOpen = () => {
    setOpenSearchDialog(true);
  };
  const deleteGroupHandler = async (groupId: number) => {
    await dispatch(deleteGroupAction({ group_id: groupId.toString() }));
    dispatch(deleteGroup());
  };

  useEffect(() => {
    if (selectGroupId) {
      dispatch(getGroupInfoAction({ group_id: selectGroupId.toString() }));
    }
  }, [selectGroupId]);

  return (
    <Card>
      {selectGroupId && selectedGroupDetail ? (
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography align="center" variant="h4" fontFamily="fantasy">
              {selectedGroupDetail.group_name}
            </Typography>

            {selectedGroupDetail.isUserGroupAdmin && (
              <>
                {" "}
                {viewMessage ? (
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => setViewMessage(false)}
                  >
                    Edit Group
                  </Button>
                ) : (
                  <Box>
                    <Tooltip title="Add user to group">
                      <IconButton onClick={handleSearchClickOpen}>
                        <GroupAddIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rename this group">
                      <IconButton onClick={handleRenameClickOpen}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete this group">
                      <IconButton
                        onClick={() => deleteGroupHandler(selectGroupId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Close Edit Group">
                      <IconButton
                        color="error"
                        onClick={() => setViewMessage(true)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </>
            )}
          </Box>

          {viewMessage ? (
            <h1>Message</h1>
          ) : (
            <GroupUsersList
              selectedGroupDetail={selectedGroupDetail}
              selectGroupId={selectGroupId}
            />
          )}

          {selectGroupId && (
            <RenameGroupDialog
              groupId={selectGroupId}
              openRenameDialog={openRenameDialog}
              setOpenRenameDialog={setOpenRenameDialog}
            ></RenameGroupDialog>
          )}
          {selectGroupId && (
            <AddUserToGroup
              groupId={selectGroupId.toString()}
              openSearchDialog={openSearchDialog}
              setOpenSearchDialog={setOpenSearchDialog}
            ></AddUserToGroup>
          )}
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            padding="1rem"
            variant="h1"
            align="center"
            fontFamily="cursive"
          >
            Kindly select any group to view message or check settings
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default GroupDetailComponent;
