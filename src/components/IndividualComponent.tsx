import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const IndividualComponent = () => {
  return (
    <Card>
      <Box height="750px" bgcolor="lightgrey">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          padding={1}
          gap={1}
        >
          <Button variant="contained">Add new Contact</Button>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="row" padding={1} gap={1}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>Sk</Avatar>
          <div>
            <Typography variant="body1">Individual</Typography>
            <Typography variant="subtitle2">Individual Message</Typography>
          </div>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="row" padding={0.5} gap={1}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>SW</Avatar>
          <div>
            <Typography variant="body1">Individual</Typography>
            <Typography variant="subtitle2">Individual Message</Typography>
          </div>
        </Box>
        <Divider />{" "}
        <Box display="flex" flexDirection="row" padding={0.5} gap={1}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>12</Avatar>
          <div>
            <Typography variant="body1">Individual</Typography>
            <Typography variant="subtitle2">Individual Message</Typography>
          </div>
        </Box>
        <Divider />
      </Box>
    </Card>
  );
};

export default IndividualComponent;
