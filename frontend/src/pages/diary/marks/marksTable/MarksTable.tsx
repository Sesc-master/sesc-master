import React from "react";
import styles from "./MarksTable.module.scss"

type IMarksTable = {
    marks: string | number [],
    subject: string
}

const MarksTable = ({marks, subject} : IMarksTable) => {
    return(
        <div className={styles.main}>
            <div className={styles.subject}>{subject}</div>
            <div className={styles.flex}>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>1ч</div>
                    <div className={styles.cellItem}>{marks[0]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>2ч</div>
                    <div className={styles.cellItem}>{marks[1]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>1п</div>
                    <div className={styles.cellItem}>{marks[2]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>3ч</div>
                    <div className={styles.cellItem}>{marks[3]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>4ч</div>
                    <div className={styles.cellItem}>{marks[4]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>2п</div>
                    <div className={styles.cellItem}>{marks[5]}</div>
                </div>
                <div className={styles.cell}>
                    <div className={styles.cellItem}>год</div>
                    <div className={styles.cellItem}>{marks[5]}</div>
                </div>
            </div>
        </div>
    )
}

export default MarksTable;