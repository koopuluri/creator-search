import React, { useState, useEffect } from 'react'

import styles from "./searchbar.module.css"

export default function SearchBar(props: {
    term: string,
    onChange: (term: string) => void;
}) {
    return (
        <input
            placeholder="Search"
            className={styles.searchBar}
            onChange={(e: any) => props.onChange(e.target.value)} 
            value={props.term} 
        />
    )
}