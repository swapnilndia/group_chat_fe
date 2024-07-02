import { Box, Chip } from "@mui/material";
import IndividualComponent from "./IndividualComponent";
import GroupComponent from "./GroupComponent";

const Contact = ({
  group,
  setGroup,
}: {
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <Box display="flex" justifyContent="space-between" padding="0.5rem">
        <Chip
          label="Individual"
          onClick={() => setGroup("IND")}
          clickable
          color={group === "IND" ? "success" : "info"}
        />
        <Chip
          label="Group"
          onClick={() => setGroup("GRP")}
          clickable
          color={group === "GRP" ? "success" : "info"}
        />
      </Box>
      <Box>
        {group === "IND" ? <IndividualComponent /> : <GroupComponent />}
      </Box>

      <Box></Box>
    </div>
  );
};

export default Contact;
