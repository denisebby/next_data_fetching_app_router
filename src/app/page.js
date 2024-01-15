import {React, Suspense} from 'react'
import Head from 'next/head'
import Link from 'next/link';


import Histogram from './ui/plotly/Histogram'; // Import your display component
import HistogramWrapperStatic from './ui/plotly/HistogramWrapperStatic';
import HistogramWrapperDynamic from './ui/plotly/HistogramWrapperDynamic';
// import StaticHistogram from './ui/plotly/StaticHistogram';
// import DynamicHistogram from './ui/plotly/DynamicHistogram';

import styles from './page.module.css'


const Home = async () => {
    // const static_data = await getDataStaticRendering();
    // const dynamic_data = await getDataDynamicRendering();
    // const [static_data, dynamic_data] = await Promise.all([getDataStaticRendering(), getDataDynamicRendering()]);
  const redirectToGitHub = async () => {
    "use server"
      window.open('https://github.com/denisebby/next_data_fetching_app_router', '_blank');
  };
  
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
              {/* <button className={styles["button"]} onClick={redirectToGitHub}>Github</button> */}
            </div>
          </div>
          <div data-thq="thq-burger-menu" className={styles["home-burger-menu"]}>
            {/* <svg viewBox="0 0 1024 1024" className={styles["home-icon"]}>
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg> */}
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
                {/* <button className={styles["button"]} onClick={redirectToGitHub}>Github</button> */}
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
              <li> 
            With getStaticProps, for production build, it will not refetch data. 
            It's fetched at build time and that's it. But there's more that can be done with revalidation.
            getServerSideProps fetches per request.
            </li>
              <li>getStaticProps always runs on the server and never on the client
              </li>
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
                <li> We can't use async and await in client components.</li>
                <li> Currently, if you call a dynamic function inside your route 
                    (e.g. noStore(), cookies(), etc), your whole route becomes dynamic. This aligns 
                    with how most web apps are built today, you either choose between 
                    static and dynamic rendering for your entire application or for specific routes.
                    As of 12-27-2023, I think Vercel is experimenting with partial prerendering.
                </li>
              
            </ul>
          </div>
        </div>
        <div className={styles["home-example1c"]}>
          <div className={styles["home-container03"]}>
            <span className={`${styles["home-text04"]} Heading`}>1</span>
          </div>
          <div className={styles["home-container04"]}>
            <h1 className={`${styles["home-text05"]} ${styles["Subheading"]}`}>
                useEffect in Client Component
            </h1>
            <div className={styles["home-container05"]}>
            
              <div>
                The data is fetched on every user browser refresh. I artificially set a timeout of 10 seconds to simulate a slow data fetch. So this data ends up loading last.
                <br></br>
                See code <a 
                          href="https://github.com/denisebby/next_data_fetching_app_router/blob/main/src/app/ui/plotly/Histogram.js"
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'underline' }}
                        >
                          here
                        </a>.

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
              Static Rendering
            </h1>
            <div className={styles["home-container08"]}>
            <span>
              The data stays constant and is fetched once at build time. If we refresh the page, the data will stay the same. 
              <br></br>
              See code <a 
                          href="https://github.com/denisebby/next_data_fetching_app_router/blob/main/src/app/ui/plotly/HistogramWrapperStatic.js" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'underline' }}
                        >
                          here
                        </a>.
            </span>

            </div>
            <div className={styles["home-container09"]}>
                {/* <StaticHistogram></StaticHistogram> */}
            {/* <Histogram prop_data = {static_data.props.prop_data} prop_timestamp = {static_data.props.prop_timestamp} id_name = {"from_static_render"}></Histogram> */}
            <HistogramWrapperStatic></HistogramWrapperStatic>
            </div>
          </div>
          <div className={styles["home-container10"]}>
            <span className={`${styles["home-text09"]} ${styles["Heading"]}`}>2</span>
          </div>
        </div>


        <div className={styles["home-example1c"]}>
          <div className={styles["home-container03"]}>
            <span className={`${styles["home-text04"]} Heading`}>3</span>
          </div>
          <div className={styles["home-container04"]}>
            <h1 className={`${styles["home-text05"]} ${styles["Subheading"]}`}>
                Dynamic Rendering
            </h1>
            <div className={styles["home-container05"]}>
            
              <div>
                The data is fetched on every user browser refresh. The data is fetched on the server and should be fast. 
                Without the use of Suspense, the whole page will not load without this data being fetched. With Suspense, the 
                page at least shows and the fallback presentation shows. I artificially set a timeout of 5 seconds to simulate a slow data fetch.

                Note that the code used to fetch the data is very similar to the static rendering code but this time, we add the cache: 'no-store'.

                <br></br>
                See code <a 
                          href="https://github.com/denisebby/next_data_fetching_app_router/blob/main/src/app/ui/plotly/HistogramWrapperDynamic.js" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'underline' }}
                        >
                          here
                        </a>.
            



              </div>
            </div>
            <div className={styles["home-container06"]}>

            <Suspense fallback={<div> Suspense loading here...</div>}>
                {/* <Histogram prop_data = {dynamic_data.props.prop_data} prop_timestamp = {dynamic_data.props.prop_timestamp} id_name = {"from_dynamic_render"}></Histogram> */}
                <HistogramWrapperDynamic></HistogramWrapperDynamic>
            </Suspense>

            </div>
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