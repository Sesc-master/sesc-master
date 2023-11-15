import React from "react";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

const AppHeader = () : JSX.Element => {
    return(
        <>
            <CssBaseline />
            <AppBar sx={{margin: "0px", position: "relative"}}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        SESC Master
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppHeader;