import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import {
  deleteSelectedContactId,
  selectUserContactInfo,
} from "../redux/reducers/userSlice";
import { removeUserFromContactAction } from "../redux/actions/userAsyncActions";
import IndividualMessageList from "./IndividualMessageList";

const IndividualDetailComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedContactInfo = useSelector(selectUserContactInfo);

  const deleteContactHandler = async (contactId: number) => {
    await dispatch(removeUserFromContactAction({ contact_user_id: contactId }));
    dispatch(deleteSelectedContactId());
  };

  return (
    <Card>
      {selectedContactInfo ? (
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography align="center" variant="h4" fontFamily="fantasy">
              {selectedContactInfo.name}
            </Typography>

            <Box>
              <Tooltip title="Delete this group">
                <IconButton
                  onClick={() =>
                    deleteContactHandler(selectedContactInfo.user_id)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <IndividualMessageList />
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            padding="1rem"
            variant="h3"
            align="center"
            fontFamily="cursive"
          >
            Kindly select any user to view message or check settings
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default IndividualDetailComponent;
