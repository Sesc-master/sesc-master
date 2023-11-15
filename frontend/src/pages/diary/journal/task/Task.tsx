import React, {useState} from "react";
import TextWithLinks from "../../../../components/textWithLinks/TextWithLinks";
import styles from "./Task.module.scss";
import TopicText from "./TopicText";
import classNames from "classnames";

type ITask = {
    date : string, 
    topic : string, 
    homework : string, 
    mark : string,
    weight : number 
}

const Task = ({date, topic, homework, mark, weight}: ITask) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
	
    return (	
        <div className={classNames(styles.table)} onClick={() => setIsOpened(!isOpened)}>
            <div className={classNames(styles.main)}>
                <div className={classNames(styles.center, styles.taskDate, styles.cell)}>
                    {date}
                </div>
                <div className={classNames(styles.text, styles.cell)}>
                    <TopicText topic={topic} isOpened={isOpened}/>
                </div>
                <div className={styles.info}>
                    <div className={classNames(styles.center, styles.mark, styles.styledTask, styles.cell, styles.bold)}>
                        {mark}
                    </div>
                    <div className={classNames(styles.center, styles.mark, styles.styledTask, styles.cell)}>
                        {`${weight / 2}x`}
                    </div>
                </div>
            </div>
            <div className={classNames({[styles.hidden]: !isOpened}, styles.moreInfo, styles.cell)}>
                <TextWithLinks str={homework}/>
            </div>
        </div>
    )
}; 

export default Task;