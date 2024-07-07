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
          style={{ backgroundColor: group === "IND" ? "#25D366" : "inherit" }}
        />
        <Chip
          label="Group"
          onClick={() => setGroup("GRP")}
          clickable
          style={{ backgroundColor: group === "GRP" ? "#25D366" : "inherit" }}
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
