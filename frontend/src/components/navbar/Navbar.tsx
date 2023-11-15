import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import Icon from "../icon/Icon";
import {appSettingsStore} from "../../modules/effector/AppSettingsStore"
import {useStore} from "effector-react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import styles from "./Navbar.module.scss"
import classNames from "classnames";
import {isIOS} from "react-device-detect";

const Navbar = () => {
    const [page, setPage] = useState<string>()
    const {navbarItems} = useStore(appSettingsStore)
    const navigate = useNavigate();
    const location = useLocation();

    const setCurrentLocation = () => {
        let path : string = location.pathname;
        setPage(path)
    }

    const openPage = (page: string) : void => {
        navigate(page)
    }

    useEffect(() => {
        setCurrentLocation()
    })

    const [isIphone, setIsIphone] = useState(false);

    useEffect(() => {
        if (isIOS) {
            setIsIphone(true)
        }
    }, [])

    return (
        <BottomNavigation
        value={page}
        className={classNames(styles.navbar, {[styles.iphone]: isIphone})}
        >
          {navbarItems.map((navbarItem) => {
              if (navbarItem.isActive) {
                  return (
                    <BottomNavigationAction
                      key={navbarItem?.link}
                      value={navbarItem?.link}
                      icon={<Icon iconName={navbarItem.iconName}/>}
                      onClick={() => {
                          openPage(navbarItem.link)
                          setPage(navbarItem.link)
                      }}>
                    </BottomNavigationAction>
                  )
              }
          })}
        </BottomNavigation>
    );
}

export default Navbar;
