import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import {Grid} from "@mui/material";

const AppHeader = () : JSX.Element => {
    return(
        <>
            <CssBaseline />
            <AppBar sx={{margin: "0px", position: "relative"}}>
                <Toolbar>
                    <Grid
                        component="div"
                        maxWidth={'700px'}
                        width={'100%'}
                        ml={'auto'}
                        mr={'auto'}
                        display={'flex'}
                        alignItems={'center'}
                        pb={1}
                        pt={1}
                    >
                        <img
                            height={'45px'}
                            src={'/logo_new_year.webp'}
                            style={{ borderRadius: '8px' }}
                        />
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppHeader;