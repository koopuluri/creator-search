import React from "react"

import styles from "./searchresult.module.css"

function getHighlightedText(text: string, highlight: string) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'white' } : {} }>
            { part }
        </span>)
    } </span>;
}


export default function SearchResult(props: {
    title: string,
    image: string,
    when: string,
    duration: string,
    text: string[],
    channel: string,
    searchTerm: string;
    destination: string;
}) {

    let texts = props.text.map((text) => {

        // clip first 19 characters of 'text':
        let annotation = text.slice(1, 18)
        let rest = text.slice(19)

        let highlighted = getHighlightedText(rest, props.searchTerm)


        // Get seconds from timestamp H:MM:SS : H:MM:SS
        let seconds = 0        
        annotation.slice(0, 7).split(":").reverse().map((acc: any, time) => seconds += (parseInt(acc))*60*time);

        // Add youtube timestamp to url as link:
        let destination = props.destination + "&t=" + seconds
        
        return (
            <div className={styles.textLineContainer}>
                <a className={styles.annotation} href={destination} target="_blank">{annotation}</a>
                {highlighted}
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={props.image} />
                <span className={styles.duration}>{props.duration}</span>
            </div>
            <div className={styles.textContainer}>
                <a href={props.destination} target="_blank"><h1 className={styles.title}>{props.title}</h1></a>
                <span className={styles.when}>{props.when}</span>
                <span className={styles.channel}>{props.channel}</span>
            </div>
            <div className={styles.text}>
                {texts}
            </div>
        </div>
    )
}