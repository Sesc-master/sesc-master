import React, { useMemo } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    SwipeableDrawer,
    Grid
} from '@mui/material';
import {setModalView} from "../../modules/effector/AppSettingsStore";
import {Modal as ModalName} from "../../modules/Modal";
import {useStore} from "effector-react";
import {appSettingsStore} from "../../modules/effector/AppSettingsStore";
import Puller from "./Puller";

type IModalPage = {
    children: JSX.Element,
    name?: ModalName,
    isOpen?: boolean,
    close?: () => any,
    height?: string,
}

const ModalPage = ({children, name, isOpen, height, close} : IModalPage) => {
    const {modalView} = useStore(appSettingsStore);
    const width = document.documentElement.clientWidth;
    const modalPage = (name?: ModalName | "") => {
      return (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event?.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') || name === undefined) {
          return;
        }

        if (name === '' && close) {
          close()
        }

        setModalView(name);
      };
    }

    const open = useMemo<boolean>(() => {
      return Boolean(modalView === name || isOpen)
    }, [modalView, name, isOpen])

    return (
        <>
            {width <= 770 ? (
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={open}
                    onClose={modalPage("")}
                    onOpen={modalPage(name)}
                    disableSwipeToOpen={true}
                    sx={{'& .MuiDrawer-paper':
                            {
                              maxHeight: "90%",
                              minHeight: "25%",
                              borderRadius: "15px 15px 0px 0px",
                              height,
                              overflow: 'visible'
                            }}}
                    swipeAreaWidth={0}
                >
                    <Puller />
                    <Grid height={'100%'} overflow={'scroll'}>
                      {children}
                    </Grid>
                </SwipeableDrawer>
            ) : (
                <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                    maxWidth="xs"
                    open={modalView === name}
                >
                    <DialogContent  dividers>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={modalPage("")}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ModalPage;
