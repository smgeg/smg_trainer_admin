import { Box, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens();
  const colorMode = useContext(ColorModeContext);

  return <Box display="flex" justifyContent="space-between" p={2}></Box>;
};

export default Topbar;
