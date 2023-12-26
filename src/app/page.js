import React from 'react'
import Head from 'next/head'
import Link from 'next/link';

import Histogram from './ui/plotly/Histogram'; // Import your display component



import styles from './page.module.css'

async function getData() {
    try {
        const res = await fetch('https://randomuser.me/api/?results=100',);
    
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
    
        const jsonData = await res.json();
        const prop_data = jsonData.results.map(record => record.dob.age);
    
        // Generating a timestamp in Eastern Time
        const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    
        return { props: { prop_data: prop_data, prop_timestamp: easternTime } };
      } catch (error) {
        // Handle errors as needed, possibly passing an error message in props
        return { props: { error: error.message } };
      }
}



const Home = async () => {
    const data = await getData()
    console.log(data)
  return (
    <>
      <div className={`${styles["home-container"]}`}>
        <Head>
          <title>next_data_fetching</title>
          <meta property="og:title" content="next_data_fetching" />
        </Head>
        <header data-thq="thq-navbar" className={styles["home-navbar-interactive"]}>
          <div className={styles["home-container01"]}>
            <img
              alt="image"
              src="/external/icons8-dog-park-100-1500h.png"
              className={styles["home-image"]}
            />
            <h1 className={styles["home-text"]}>Next So Fetch</h1>
          </div>
          <div data-thq="thq-navbar-nav" className={styles["home-desktop-menu"]}>
            <div className={styles["home-buttons"]}>
              <button className={styles["button"]}>Github</button>
            </div>
          </div>
          <div data-thq="thq-burger-menu" className={styles["home-burger-menu"]}>
            <svg viewBox="0 0 1024 1024" className={styles["home-icon"]}>
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu" className={styles["home-mobile-menu"]}>
            <div className={styles["home-nav"]}>
              <div className={styles["home-top"]}>
                <div className={styles["home-container02"]}>
                  <img
                    alt="image"
                    src="/external/icons8-dog-park-100-1500h.png"
                    className={styles["home-image1"]}
                  />
                  <h1 className={styles["home-text01"]}>Next So Fetch</h1>
                </div>
                <div data-thq="thq-close-menu" className={styles["home-close-menu"]}>
                  <svg viewBox="0 0 1024 1024" className={styles["home-icon2"]}>
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <div className={styles["home-buttons1"]}>
                <button className={styles["button"]}>Github</button>
              </div>
            </div>
          </div>
        </header>
        <div className={styles["home-descriptionc"]}>
          <h1 className={styles["home-text02"]}>A NextJS Data Fetching Guide</h1>
          <svg viewBox="0 0 1024 1024" className={styles["home-icon4"]}>
            <path d="M0 192l320-128v768l-320 128z"></path>
            <path d="M384 32l320 192v736l-320-160z"></path>
            <path d="M768 224l256-192v768l-256 192z"></path>
          </svg>
          <div className={styles["home-text03"]}>
            I made this app to explore all the different ways to load data in a Next JS app. See github for the code.
            <br></br>
            <br></br>
            Notes:
            <ul>
              <li> With getStaticProps, for production build, it will not refetch data. 
            It's fetched at build time and that's it. But there's more that can be done with revalidation.
            getServerSideProps fetches per request.</li>
              <li>getStaticProps always runs on the server and never on the client</li>
              <li>Incremental static regeneration (ISR); add revalidate</li>
              <li>Write server code directly in getStaticProps and getServerSideProps. Instead of fetching an API route 
                from them (that itself fetches data from an external source),
                 you can write the server-side code directly in getStaticProps and getServerSideProps.</li>
              <li>With getServerSideProps, for production build, it refetches data. 
                It prebuilds the page on a (probably optimized, fast) server per request.
                Triggers a new data fetch on the server side before the page is served to the client,
                 making the latest data available immediately on page load </li>
              <li>We cannot use getServerSideProps and getStaticProps on the same page.</li>
              <li>useEffect: Triggers a new data fetch from the client side after the component is re-mounted post-refresh.</li>
                <li>Static Site Generation (next 12) is Static Rendering (Next 13) (both are default)</li>
                <li>Server Side Rendering is Dynamic Rendering</li>
                <li>If NextJS detects uncached data or dynamic functions (like cookies(), headers(), or useSearchParams())
                  , then it uses dynamic rendering</li>
                <li>Server Components: Components are server components by default. Better for performance. </li>
                <li>For interactivity, use client componenets. They prerender on the server
                   but hydrated on the client. Only fully render on the client.</li>
                <li>Server components prerender just that component on the server at build time. 
                  Dyamic rendering renders an entire route on the server at request time. </li>
                <li>When to use client vs server components. Use client components when using React hooks,
                     event listeners like onClick, and/or custom hooks that depend on state or effects. Use server components
                     when sensitive info like API keys need to be stored, 
                     you need to access backend resources directly, and/or there are large dependencies.
                </li>
                <li> We can't directly import a server component into a client component. 
                    But we can pass server component to client component as props.</li>
              
            </ul>
          </div>
        </div>
        <div className={styles["home-example1c"]}>
          <div className={styles["home-container03"]}>
            <span className={`${styles["home-text04"]} Heading`}>1</span>
          </div>
          <div className={styles["home-container04"]}>
            <h1 className={`${styles["home-text05"]} ${styles["Subheading"]}`}>
              Blah
            </h1>
            <div className={styles["home-container05"]}>
            
              <div>
                Blah blah
            
                <br></br>
                <br></br>
                Blah

              </div>
            </div>
            <div className={styles["home-container06"]}>
                <Histogram></Histogram>
            </div>
          </div>
        </div>
        <div className={styles["home-example2c"]}>
          <div className={styles["home-container07"]}>
            <h1 className={`${styles["home-text07"]} ${styles["Subheading"]}`}>
              getServerSideProps
            </h1>
            <div className={styles["home-container08"]}>
              <span>
                See demo of getServerSideProps here:
                <br></br>
                <br></br>

                <Link href="/more_examples/ue_vs_g_server_side_p" >
                  See how getServerSideProps works...
                </Link>
              </span>
            </div>
            <div className={styles["home-container09"]}>
            </div>
          </div>
          <div className={styles["home-container10"]}>
            <span className={`${styles["home-text09"]} ${styles["Heading"]}`}>2</span>
          </div>
        </div>
        <div className={styles["home-example3c"]}>
          <div className={styles["home-container11"]}>
            <span className={`${styles["home-text10"]} ${styles["Heading"]}`}>3</span>
          </div>
          <div className={styles["home-container12"]}>
            <h1 className={`${styles["home-text11"]} ${styles["Subheading"]}`}>
              getServerSideProps
            </h1>
            <div className={styles["home-container13"]}>
              <span>
                We can't use getServerSideProps and getStaticProps on the same page.
                I made a new page that uses getServerSideProps.

                <br></br>
                <br></br>

                <Link href="/more_examples/ue_vs_gssp" >
                  See example
                </Link>
              </span>
            </div>
            <div className={styles["home-container14"]}></div>
          </div>
        </div>
        <div className={styles["home-example4c"]}>
          <div className={styles["home-container15"]}>
            <h1 className={`${styles["home-text13"]} ${styles["Subheading"]}`}>
              On the Client, with 3rd party libraries
            </h1>
            <div className={styles["home-container16"]}>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </span>
            </div>
            <div className={styles["home-container17"]}></div>
          </div>
          <div className={styles["home-container18"]}>
            <span className= {`${styles["home-text15"]} ${styles["Heading"]}`}>4</span>
          </div>
        </div>
        <footer className={styles["home-footer"]}>
          <div className={styles["home-container19"]}>
            <div className={styles["home-container20"]}>
              <img
                alt="image"
                src="/external/icons8-dog-park-100-1500h.png"
                className={styles["home-image2"]}
              />
              <h1 className={styles["home-text16"]}>Next So Fetch</h1>
            </div>
            <span className={styles["home-text17"]}>
              Icon from https://icons8.com/icons
            </span>
          </div>
          <span className={styles["home-text18"]}>by Denis Ebby</span>
        </footer>
      </div>
    </>
  )
}

export default Home;