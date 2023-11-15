import {useCallback, useEffect, useState} from 'react';
import {isPWA} from "../projectRoot/IsPWA";
import {isMobile} from "react-device-detect";
import ModalPage from "../modalPage/ModalPage";
import Installation from "../installation/Installation";
import {Grid} from "@mui/material";

const PwaInstallerModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isPWA() && isMobile) {
      setIsOpen(true)
    }

    const onInstalled = () => {
      closeModal();
      window.removeEventListener('appinstalled', onInstalled);
    }

    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  return (
    <ModalPage isOpen={isOpen} close={closeModal}>
      <Grid pt={2} pl={1} pr={1} pb={3} height={'calc(100vh - 90px)'}>
        <Installation />
      </Grid>
    </ModalPage>
  );
};

export default PwaInstallerModal;
