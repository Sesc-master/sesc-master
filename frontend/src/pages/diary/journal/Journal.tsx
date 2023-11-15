import React, {useState, useMemo} from "react";
import Task from "./task/Task";
import {Modal} from "../../../modules/Modal";
import {setModalView} from "../../../modules/effector/AppSettingsStore";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {useStore} from "effector-react"
import styles from "./Journal.module.scss"
import dateComparator from "../../../modules/scoleAPI/date/dateComparator";
import Select from "../../../components/select/Select";
import {ToggleButton, ToggleButtonGroup, Grid} from "@mui/material";

enum ISortingType {
    NewerToOlder = 1,
    OlderToNewer = 2
}

const Journal = () => {
    const {diary, targetSubject} = useStore(diaryStore)
    const teacher = diary.get(targetSubject)?.teacher
    const [sortingType, setSortingType] = useState<ISortingType>(ISortingType.NewerToOlder);

    const tasks = useMemo(() => {
        if (!diary) return;
        let tasks = [...diary.get(targetSubject)?.notes]

        if (sortingType === ISortingType.NewerToOlder &&
            dateComparator(tasks[0].date, tasks[tasks.length - 1].date)){
            tasks = Array.from(tasks).reverse()
        } else if (sortingType === ISortingType.OlderToNewer &&
            !dateComparator(tasks[0].date, tasks[tasks.length - 1].date)){
            tasks = Array.from(tasks).reverse()
        }

        return tasks;
    }, [sortingType, targetSubject, diary])

    return (
        <section className="content">
            <Select
                placeholder="предмет не выбран"
                value={!!targetSubject && `${targetSubject}. ${teacher}` || ""}
                handler={() => setModalView(Modal.Subjects)}
            />
            {tasks && (
              <Grid pt={1} pb={2}>
                  <ToggleButtonGroup
                    color="primary"
                    value={sortingType}
                    exclusive
                    onChange={(_, value ) => {
                        if (value !== null)
                            setSortingType(value as ISortingType)
                    }}
                    defaultValue={sortingType}
                    fullWidth
                  >
                      <ToggleButton value={ISortingType.NewerToOlder}>От новых к старым</ToggleButton>
                      <ToggleButton value={ISortingType.OlderToNewer}>От старых к новым</ToggleButton>
                  </ToggleButtonGroup>
              </Grid>
            )}
            {tasks && Array.from(tasks)?.map((task: any, index) =>
            (<div className={styles.task} key={index}>
                <Task
                    date={task.date}
                    topic={task.theme}
                    homework={task.hometask}
                    weight={task.coefficient}
                    mark={task.grades}
                />
            </div>
            ))}
        </section>
    )
}

export default Journal
