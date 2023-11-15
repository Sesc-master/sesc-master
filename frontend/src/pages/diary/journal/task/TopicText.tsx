import React from 'react';
import TextWithLinks from "../../../../components/textWithLinks/TextWithLinks";
import styles from "./Task.module.scss"

const TopicText = ({topic, isOpened}: {topic: string, isOpened: boolean}) => {
    const format = (topic: string) => {
        const formatedTopicLength = 45

        let formatedTopic = topic

        if (formatedTopic?.length >= formatedTopicLength && !isOpened) {
            formatedTopic = formatedTopic.slice(0, formatedTopicLength) + "..."
        }
        return formatedTopic;
    }

    return (
        <div>
            {topic === undefined ? (
                null
            ) : isOpened || format(topic) === "" ? (
                <TextWithLinks str={format(topic)} />
            ) : (
                <>
                    {format(topic)}
                    <p className={styles.instruction}>Развернуть</p>
                </>
            )}
        </div>
    )
};

export default TopicText;