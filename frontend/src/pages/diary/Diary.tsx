import React, {useEffect, useState, useRef} from "react";
import Login from "./login/Login";
import Journal from "./journal/Journal"
import {
    setIsDiaryLoading,
    diaryStore,
    setIsError
} from "../../modules/effector/DiaryStore";
import {useStore} from "effector-react";
import {useLoadDiary} from "../../hooks/useLoadDiary";
import Loading from "../../components/loading/Loading";
import Marks from "./marks/Marks";
import Documents from "./documents/Documents";
import Notes from "./notes/Notes";
import SkippedLessons from "./skipedLessons/SkippedLessons";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const DiaryPanel = {
    Journal: {
        name: "Дневник",
        element: <Journal/>
    },
    SkippedLessons: {
        name: "Пропуски",
        element: <SkippedLessons/>
    },
    Marks: {
        name: "Табель",
        element: <Marks/>
    },
    Notes: {
        name: "Заметки",
        element: <Notes/>
    },
    Documents: {
        name: "Документы",
        element: <Documents/>
    },
}

const Diary = () : JSX.Element => {
    const [loginRequest, setLoginRequest] = useState<any>({})
    const {isLogin, isDiaryLoading, isError} = useStore(diaryStore)
    const [activePage, setActivePage] = useState<any>(DiaryPanel.Journal);
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current === true){
            firstUpdate.current = false
            return;
        }

        setIsDiaryLoading(true);
        setIsError(false);

        const {login, password, type} = loginRequest;
        useLoadDiary(login, password, type);
    }, [loginRequest])

    return (
        <>
            {isDiaryLoading && <Loading />}
            {!isLogin && !isDiaryLoading && <Login setLoginRequest={setLoginRequest}/>}
            {isLogin && (
              <Grid mb={1} borderRadius={'10px'} width={'100%'} display={'flex'} justifyContent={'center'} sx={{ backgroundColor: '#272727'}}>
                  <Tabs
                    value={activePage.name}
                    allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons={true}
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                  >
                      {Object.values(DiaryPanel).map((panel, id) =>
                        <Tab
                          onClick={() => setActivePage(panel)}
                          value={panel.name}
                          key={id}
                          label={panel.name}
                        />
                      )}
                  </Tabs>
              </Grid>
            )}
            {isLogin && !isDiaryLoading && activePage?.element}
            {isError &&
                <Typography className={"content"} color={"error.light"}>
                    *убедитесь, что верно указали данные
                </Typography>
            }
        </>
    );
}

export default Diary;
