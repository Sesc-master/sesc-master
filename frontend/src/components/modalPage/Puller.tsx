import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material";

export default styled(Box)(({ theme }) => ({
    width: 50,
    height: 6,
    backgroundColor: 'rgba(53,53,53,0.78)',
    borderRadius: 3,
    position: 'absolute',
    left: 'calc(50% - 25px)',
    top: '-8px'
}))
