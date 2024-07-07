import { Box, Button, Card, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectListOfGroup } from "../redux/reducers/groupSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/appStore";
import { getListOfGroupsAction } from "../redux/actions/groupAsyncAction";
import ViewGroupList from "./ViewGroupList";
import AddNewGroupDialog from "./AddNewGroupDialog";

const GroupComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const listOfGroup = useSelector(selectListOfGroup);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (listOfGroup === null) {
      dispatch(getListOfGroupsAction());
    }
  }, [listOfGroup, dispatch]);

  return (
    <Card>
      <Box height="750px" bgcolor="lightgrey">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          padding={1}
          gap={1}
          borderBottom="1px solid black"
        >
          <Button variant="contained" onClick={handleClickOpen}>
            Add new Group
          </Button>
        </Box>
        <Divider />
        {listOfGroup && listOfGroup.length > 0 && (
          <ViewGroupList listOfGroup={listOfGroup} />
        )}{" "}
      </Box>
      <AddNewGroupDialog open={open} setOpen={setOpen} />
    </Card>
  );
};

export default GroupComponent;
