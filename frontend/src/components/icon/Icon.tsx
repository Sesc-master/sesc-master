import React from 'react';
import {IconName} from './IconName'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

type IconProps = {
    iconName: IconName
}

const Icon: any = ({iconName} : IconProps) => {
    let TargetIcon : any;

    switch (iconName) {
        case IconName.About:
            TargetIcon = MenuOutlinedIcon
            break
        case IconName.Diary:
            TargetIcon = ListAltOutlinedIcon
            break
        case IconName.Timetable:
            TargetIcon = EventNoteOutlinedIcon
            break
        case IconName.CloseButton:
            TargetIcon = CloseIcon
            break
        case IconName.EmptyRoom:
            TargetIcon = LoginOutlinedIcon
            break
        case IconName.Settings:
            TargetIcon = SettingsOutlinedIcon
            break
        case IconName.Link:
            TargetIcon = LinkOutlinedIcon
            break
    }

    return (
        <>
            <TargetIcon sx={{ fontSize: 32 }}/>
        </>
    )
};

export default Icon;