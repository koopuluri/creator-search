import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import algoliasearch from 'algoliasearch'
import { useEffect, useState } from 'react'
import SearchBar from '@/components/SearchBar/SearchBar'
import SearchResult from '@/components/SearchResult/SearchResult'

import { useRouter } from 'next/router';

import Router from 'next/router'

const client = algoliasearch(
  'WP9YK3LA1O',
  '3f9c651c67b4f7514372619b1f19dad7',
);

const index = client.initIndex('Revised');
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  let [term, setTerm] = useState<string>("")
  let [hits, setHits] = useState<any>([])

  const { asPath, isReady } = router;

  useEffect(() => {
    if (!isReady) return;
    setTerm(router.query.q as string)
  }, [asPath, isReady])

  useEffect(() => {
    index.setSettings({
      highlightPreTag: '<strong>',
      attributesToHighlight: [
        '*'
      ]
    });
  }, [])

  useEffect(() => {
    index.search(term, {
      highlightPreTag: '<strong>'
    }).then(({ hits }) => {
      if (!term) return setHits([])
      setHits(hits)
    });
  }, [term])

  const searchResults = hits.map((hit: any) => {

    // Prettify date from YYYY-MM-DD to human readable (e.g. one year ago):
    let prettyDate = new Date(hit.uploadDate).toLocaleDateString('en-US', {
      year: 'numeric',
      ['month']: 'long',
      day: 'numeric'
    })

    return (
      <SearchResult 
        title={hit.title}
        image={hit.thumbnails[4].url}
        when={prettyDate}
        duration={hit.duration}
        text={hit.text}
        channel={hit.channel}
        searchTerm={term}
        destination={hit.link}
      />
    )
})

  return (
    <>
      <Head>
        <title>Creator search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <SearchBar term={term} onChange={(v: string) => {
            Router.push({
              pathname: '/',
              query: { q: v },
          })
            setTerm(v)
          }} />
          <div className={styles.results}>
            {searchResults}
          </div>
        </div>
      </main>
    </>
  )
}
