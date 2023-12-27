"use client"

import dynamic from "next/dynamic";


import React, { useEffect, useRef, useState } from 'react';
import styles from './histogram.module.css'; // This assumes you have a corresponding CSS file for styles


const Histogram = ({ prop_data, prop_timestamp }) => {

    // console.log(prop_data, "version", id_name);

    // console.log("Greetings from the histogram component!...")

    const [data, setData] = useState(prop_data || null);
    const [timestamp, setTimestamp] = useState(prop_timestamp || null);
    const [error, setError] = useState('');

    // const [Plot, setPlotly] = useState();
    const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
    const plotContainerRef = useRef(null);

    // if (!data || !data.results) {
    //     return <div>Loading...</div>; // Or any other loading indicator.
    //   }


    // attempt at conditional data fetching
    useEffect(() => {
        // fetchData();

        if (!prop_data) {
            fetchData()
        }

    }, [prop_data]);
    
    const fetchData = async () => {
    try {
        // IMPORTANT: Simulate slow data fetch

        // const timeout = process.env.TIMEOUT_USE_EFFECT;
        const timeout = 10000;
    
        setTimeout( async () => {
        const res = await fetch('https://randomuser.me/api/?results=100');

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const jsonData = await res.json();
        setData(jsonData.results.map(record => record.dob.age));

        // Generating a timestamp in Eastern Time
        const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
        setTimestamp(easternTime);

        console.log("from useEffect()");


        }, timeout);


    } catch (error) {
        setError(error.message);
    }
    };


    return (
        <div className={styles.data_display}>
            <p><b>Sample Data: Age Distribution</b></p>
            <p>Last Updated at {timestamp}</p>
            <div 
                className={`${styles.data_display2} plotly_plot`} ref={plotContainerRef} 
            >
                {

                (!data)  ? 
                (<div className="plotly_loading">Loading ...</div>) :
                (
                <Plot 
                className={`${styles.data_display2} plotly_plot`}
                data={[
                    {
                        x: data,
                        type: 'histogram',
                        marker: {
                            color: "#ff6400ff", // Change histogram color
                        },
                        hoverinfo: 'x+y',
                        nbinsx: 20,
                    }
                ]} // Data is an array of traces
                layout={{ height: 0,
                    xaxis: {
                    title: 'Age', // X-axis label
                    },
                    yaxis: {
                    title: '# People', // Y-axis label
                    },
                    hovermode: 'closest'
                }}
                useResizeHandler={true}
                >

                </Plot>
                )
                }
            </div>
        </div>
    );
};

export default Histogram;
