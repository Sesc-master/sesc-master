import React from 'react';
import styles from "./Statistics.module.scss";
import {IStatistics} from "../../../../modules/scoleAPI/absence/Statistics"
import classNames from "classnames";

const Statistics = ({statistics}: {statistics : IStatistics[] | undefined}) => {
    return (
        <div className={styles.main}>
            <h4 className={styles.subject}>Все пропуски</h4>
            <div className={styles.flex}>
                {statistics?.map(({period, allLessons, skippedLessons} : IStatistics, index: number) => {
                    return (
                        <div key={index} className={styles.cell}>
                            <h4 className={styles.cellItem}>{period}</h4>
                            <h4 className={styles.cellItem}>{allLessons}</h4>
                            <h4 className={classNames(styles.cellItem, styles.red)}>{skippedLessons}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Statistics;