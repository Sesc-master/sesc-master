import React, {useCallback, useEffect} from "react";
import Week from "./week/Week";
import {format} from "../../modules/schedule/format";
import {setModalView} from "../../modules/effector/AppSettingsStore";
import {Modal} from "../../modules/Modal";
import {useStore} from "effector-react";
import {setDay, timetableStore,} from '../../modules/effector/TimetableStore';
import Instruction from "./components/instruction/Instruction";
import ScheduleLoader from "./components/scheduleLoader/ScheduleLoader";
import DailySchedule from "./components/DailySchedule";
import Informer from "../../components/informer/Informer";
import {getCurrentDay} from "./week/GetCurrentDay";
import Select from "../../components/select/Select";
import {IonRefresher, IonRefresherContent, IonContent, IonPage} from "@ionic/react";
import {useLoadTimetable} from "../../hooks/useLoadTimetable";
import { RefresherEventDetail } from '@ionic/core';

const Schedule = () => {
    const {grade, weekSchedule, isTimetableLoading, isTeacher, teacher, day} = useStore(timetableStore);

    useEffect(() => {
        const targetDay = getCurrentDay();
        setDay(targetDay === 0 ? 0 : targetDay - 1);
    }, []);

    const reload = useCallback(async (event: CustomEvent<RefresherEventDetail>) => {
      await useLoadTimetable(grade, teacher, isTeacher)

      event.detail.complete();
    }, [grade, teacher, isTeacher])

    return (
        <IonPage>
          <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={reload}>
              <IonRefresherContent
                refreshingSpinner="lines"
              >
              </IonRefresherContent>
            </IonRefresher>
            <div className={'content'} style={{ paddingBottom: '60px' }}>
              <Informer/>
              <Select
                placeholder={"Не выбран"}
                value={isTeacher ? teacher : grade}
                handler={() => {setModalView(Modal.Type)}} />
              <Week />
              {(isTeacher && teacher === "" || !isTeacher && grade === "") ? (
                <Instruction />
              ) : weekSchedule[day] && !isTimetableLoading ? (
                <DailySchedule schedule={format(weekSchedule[day])}/>
              ) : (
                <ScheduleLoader />
              )}
            </div>
          </IonContent>
        </IonPage>
    );
};

export default Schedule;
