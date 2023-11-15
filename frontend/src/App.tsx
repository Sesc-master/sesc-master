import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './styles/Global.scss'
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import {setupIonicReact, IonApp, IonContent, IonPage, IonHeader} from "@ionic/react";
import AppHeader from "./components/appHeader/AppHeader";
import {BrowserRouter as Router} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Navbar from "./components/navbar/Navbar";
import ProjectRoutes from "./components/projectRoot/ProjectRoutes";
import ModalPage from "./components/modalPage/ModalPage";
import {Modal} from "./modules/Modal";
import Grades from "./pages/schedule/scheduleModalPages/Grades";
import Subjects from "./pages/subjects/Subjects";
import ScheduleType from "./pages/schedule/scheduleModalPages/ScheduleType";
import Teachers from "./pages/schedule/scheduleModalPages/Teachers";
import {useLoadUserData} from "./hooks/useLoadUserData";
import PwaInstallerModal from "./components/pwaInstallerModal/PwaInstallerModal";
import '@ionic/core/dist/ionic/index.esm';
import '@ionic/core/dist/ionic/ionic.js';
import '@ionic/core/css/ionic.bundle.css';
import {Grid} from "@mui/material";
import getNames from "./modules/api/getNames";
import {setClasses, setTeachers} from "./modules/effector/TimetableStore";

setupIonicReact({
	mode: 'ios',
	animated: true,
	rippleEffect: true,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = () => {
	getNames("group").then(setClasses);
	getNames("teacher").then(setTeachers);

	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	useEffect(() => {
		useLoadUserData()
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<IonApp>
				<IonContent>
					<Router>
						<IonPage>
							<Navbar/>
							<IonHeader>
								<AppHeader />
							</IonHeader>
							<IonContent>
							<Grid className="panel" overflow={'scroll'} height={'100%'}>
								<ProjectRoutes />
								<div className="end"/>
							</Grid>
							<PwaInstallerModal />
							<ModalPage name={Modal.Grades}>
								<Grades />
							</ModalPage>
							<ModalPage name={Modal.Grades}>
								<Grades />
							</ModalPage>
							<ModalPage name={Modal.Subjects}>
								<Subjects />
							</ModalPage>
							<ModalPage name={Modal.Type}>
								<ScheduleType />
							</ModalPage>
							<ModalPage name={Modal.Teachers}>
								<Teachers />
							</ModalPage>
							</IonContent>
						</IonPage>
					</Router>
				</IonContent>
			</IonApp>
		</ThemeProvider>
	);
}

export default App;
