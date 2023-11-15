import React from 'react';
import {CardActionArea} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

type ISelect = {
    value: string,
    handler: () => void,
    placeholder?: string
}

const Select = ({value, handler, placeholder}: ISelect) => {
    return (
        <CardActionArea>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                onClick={handler}
            >
                <Typography sx={{ ml: 1, flex: 1 }}>
                    {value || placeholder}
                </Typography>
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <KeyboardArrowDownOutlinedIcon />
                </IconButton>
            </Paper>
        </CardActionArea>
    );
};

export default Select;
