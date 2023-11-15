import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page} from "./Page";
import Schedule from "../../pages/schedule/Schedule";
import Diary from "../../pages/diary/Diary";
import About from "../../pages/about/About";
import EmptyAuditories from "../../pages/emptyAuditories/EmptyAuditories";
import Settings from "../../pages/settings/Settings";
import {getInitialPage} from "./getInitialPage";
import {isPWA} from "./IsPWA";
import Installation from "../installation/Installation";

const ProjectRoutes = () => {
    return (
        <Routes>
            <Route path={Page.Timetable} element={<Schedule/>}/>
            <Route path={Page.Diary} element={isPWA() ? <Diary /> : <Installation />}/>
            <Route path={Page.About} element={<About />}/>
            <Route path={Page.EmptyAuditories} element={<EmptyAuditories />}/>
            <Route path={Page.Settings} element={<Settings />}/>
            <Route
                path="*"
                element={<Navigate to={getInitialPage()} />}
            />
        </Routes>
    );
};

export default ProjectRoutes;
