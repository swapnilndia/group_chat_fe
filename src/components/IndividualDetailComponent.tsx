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
  selectUserContactId,
} from "../redux/reducers/userSlice";
import { removeUserFromContactAction } from "../redux/actions/userAsyncActions";

const IndividualDetailComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedContactId = useSelector(selectUserContactId);

  const deleteContactHandler = async (contactId: number) => {
    await dispatch(removeUserFromContactAction({ contact_user_id: contactId }));
    dispatch(deleteSelectedContactId());
  };

  return (
    <Card>
      {selectedContactId ? (
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography align="center" variant="h4" fontFamily="fantasy">
              wehowoghw
            </Typography>

            <Box>
              <Tooltip title="Delete this group">
                <IconButton
                  onClick={() => deleteContactHandler(selectedContactId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <h1>Message</h1>
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            padding="1rem"
            variant="h1"
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
