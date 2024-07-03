import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BlockIcon from "@mui/icons-material/Block";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux";
import {
  grantAdminRightsAction,
  removeUserFromGroupAction,
  revokeAdminRightsAction,
} from "../redux/actions/groupAsyncAction";
import { AppDispatch } from "../redux/appStore";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { GroupDetailDataType } from "../lib/types/group.types";
import { selectUserInfo } from "../redux/reducers/userSlice";

const GroupUsersList = ({
  selectedGroupDetail,
  selectGroupId,
}: {
  selectedGroupDetail: GroupDetailDataType;
  selectGroupId: number;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const giveAdminRightHandler = async (groupId: string, userId: number) => {
    dispatch(grantAdminRightsAction({ group_id: groupId, user_id: userId }));
  };
  const revokeAdminRightHandler = async (groupId: string, userId: number) => {
    dispatch(revokeAdminRightsAction({ group_id: groupId, user_id: userId }));
  };

  const removeUserHandler = async (groupId: string, userId: number) => {
    dispatch(removeUserFromGroupAction({ group_id: groupId, user_id: userId }));
  };
  return (
    <TableContainer component={Paper}>
      <Typography align="center" variant="h6" fontFamily="monospace">
        Group Members
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "lightgrey" }}>
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
              {selectedGroupDetail.isUserGroupAdmin &&
              userInfo?.user_id !== user.user_id ? (
                <TableCell align="right">
                  <Box>
                    {user.GroupMember.is_admin && (
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
                    )}
                    {!user.GroupMember.is_admin && (
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
                    )}

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
              ) : (
                <TableCell align="right">N/A</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupUsersList;
