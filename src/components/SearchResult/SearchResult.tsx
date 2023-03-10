import React from "react"

import styles from "./searchresult.module.css"

function getHighlightedText(text: string, highlight: string) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#95E994' } : {} }>
            { part }
        </span>)
    } </span>;
}


export default function SearchResult(props: {
    title: string,
    image: string,
    when: string,
    duration: string,
    text: {text: string; seconds: number; time: string;}[],
    channel: {name: string, link: string},
    searchTerm: string;
    destination: string;
}) {

    let texts = props.text.map((item) => {

        // clip first 19 characters of 'text':
        let { text, time, seconds } = item

        let annotation = time

        let highlighted = getHighlightedText(text, props.searchTerm)

        // Add youtube timestamp to url as link:
        let destination = props.destination + "&t=" + seconds
        
        return (
            <div className={styles.textLineContainer}>
                <a className={styles.annotation + " " + styles.positionedLeft} href={destination} target="_blank">{annotation}</a>
                {highlighted}
            </div>
        )
    })

    let title = getHighlightedText(props.title, props.searchTerm)

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={props.image} />
                <span className={styles.duration}>{props.duration}</span>
            </div>
            <div className={styles.textContainer}>
                <a href={props.destination + "&t=" + props.text[0].seconds} target="_blank"><h1 className={styles.title}>{title}</h1></a>
                <span className={styles.when}>
                    <a 
                        className={styles.annotation}
                        style={{ marginRight: 5 }}
                        target="_blank"
                        href={"https://youtube.com/" + props.channel.link}>{props.channel.name}
                    </a> 
                         | {props.when}
                </span>
            </div>
            <div className={styles.text}>
                {texts}
            </div>
        </div>
    )
}