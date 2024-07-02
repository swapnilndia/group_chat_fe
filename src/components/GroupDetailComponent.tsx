import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedGroupId,
  selectedGroupInfo,
} from "../redux/reducers/groupSlice";
import { useEffect, useState } from "react";
import {
  deleteGroupAction,
  getGroupInfoAction,
  grantAdminRightsAction,
  removeUserFromGroupAction,
  revokeAdminRightsAction,
} from "../redux/actions/groupAsyncAction";
import { AppDispatch } from "../redux/appStore";
import RenameGroupDialog from "./RenameGroupDialog";

const GroupDetailComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedGroupDetail = useSelector(selectedGroupInfo);
  const selectGroupId = useSelector(selectedGroupId);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const renameGroupHandler = async () => {
  //   console.log("rename group clicked");
  // };
  const deleteGroupHandler = async (groupId: number) => {
    dispatch(deleteGroupAction({ group_id: groupId.toString() }));
  };
  // const addNewUserHandler = async () => {
  //   console.log("add new user clicked");
  // };
  const giveAdminRightHandler = async (groupId: string, userId: number) => {
    dispatch(grantAdminRightsAction({ group_id: groupId, user_id: userId }));
  };
  const revokeAdminRightHandler = async (groupId: string, userId: number) => {
    dispatch(revokeAdminRightsAction({ group_id: groupId, user_id: userId }));
  };

  const removeUserHandler = async (groupId: string, userId: number) => {
    dispatch(removeUserFromGroupAction({ group_id: groupId, user_id: userId }));
  };

  useEffect(() => {
    if (selectGroupId) {
      dispatch(getGroupInfoAction({ group_id: selectGroupId.toString() }));
    }
  }, [selectGroupId]);

  return (
    <Card>
      {selectGroupId && selectedGroupDetail && (
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="1rem"
            border={1}
            borderRadius={2}
          >
            <Typography align="center" variant="h4">
              {selectedGroupDetail.group_name}
            </Typography>
            <Box>
              <Tooltip title="Add user to group">
                <IconButton>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rename this group">
                <IconButton onClick={handleClickOpen}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete this group">
                <IconButton onClick={() => deleteGroupHandler(selectGroupId)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Typography align="center" variant="h6">
              Group Members
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "red" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">isAdmin</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedGroupDetail.Users.map((user) => (
                  <TableRow
                    key={user.user_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                      {user.GroupMember.is_admin ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        <Tooltip title="Revoke admin rights">
                          <IconButton
                            onClick={() =>
                              revokeAdminRightHandler(
                                selectGroupId.toString(),
                                user.user_id
                              )
                            }
                          >
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Grant admin rights">
                          <IconButton
                            onClick={() =>
                              giveAdminRightHandler(
                                selectGroupId.toString(),
                                user.user_id
                              )
                            }
                          >
                            <AdminPanelSettingsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove User from group">
                          <IconButton
                            onClick={() =>
                              removeUserHandler(
                                selectGroupId.toString(),
                                user.user_id
                              )
                            }
                          >
                            <PersonRemoveAlt1Icon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectGroupId && (
            <RenameGroupDialog
              groupId={selectGroupId}
              open={open}
              setOpen={setOpen}
            ></RenameGroupDialog>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default GroupDetailComponent;
