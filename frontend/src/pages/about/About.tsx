import React from "react";
import styles from "./About.module.scss"
import sescMaster from "../../assets/sesc-master.svg"
import {useNavigate} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import {IconName} from "../../components/icon/IconName";
import {Page} from "../../components/projectRoot/Page";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemIcon, ListItemButton, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";

const About = () : JSX.Element => {
    const navigate = useNavigate()

    return (
        <>
            <Box className={styles.content}>
                <img
                    alt="sesc-master"
                    src={sescMaster}
                    width={200}
                    height={200}
                />
                <Typography variant="h6">SESC Master</Typography>
            </Box>
            <List>
                <ListItem disablePadding onClick={() : void => {navigate(Page.Settings)}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon iconName={IconName.Settings}/>
                        </ListItemIcon>
                        <ListItemText primary="Настройки" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() : void => {navigate(Page.EmptyAuditories)}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon iconName={IconName.EmptyRoom}/>
                        </ListItemIcon>
                        <ListItemText primary="Найти свободный кабинет" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
}

export default About;