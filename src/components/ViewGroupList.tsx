import { Avatar, Box, Divider, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { GroupListData } from "../lib/types/group.types";
import { AppDispatch } from "../redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { selectGroup, selectedGroupId } from "../redux/reducers/groupSlice";

const ViewGroupList = ({ listOfGroup }: { listOfGroup: GroupListData }) => {
  const dispatch: AppDispatch = useDispatch();
  const selectGroupId = useSelector(selectedGroupId);

  const handleSelectedGroup = (id: number) => {
    dispatch(selectGroup(id));
  };

  return (
    <>
      {listOfGroup.map((listItem) => (
        <Box
          key={listItem.group_id}
          display="flex"
          flexDirection="row"
          padding={1}
          gap={1}
          onClick={() => handleSelectedGroup(listItem.group_id)}
          bgcolor={selectGroupId === listItem.group_id ? "lightgreen" : "white"}
        >
          <Avatar sx={{ bgcolor: deepPurple[500] }}>Sk</Avatar>
          <div>
            <Typography variant="body1">
              {listItem["Group.group_name"]}
            </Typography>
            <Typography variant="subtitle2"></Typography>
          </div>
          <Divider />
        </Box>
      ))}
    </>
  );
};

export default ViewGroupList;
