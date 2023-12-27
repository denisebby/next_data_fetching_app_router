"use client"

import React, { useEffect, useRef, useState } from 'react';

import dynamic from "next/dynamic";
import styles from './histogram.module.css'; // This assumes you have a corresponding CSS file for styles



async function getDataDynamicRendering() {
  try {

      // IMPORTANT: simulate slow data fetch
      // const timeout = process.env.TIMEOUT_DYNAMIC_RENDER;
      const timeout = 5000
      // console.log(timeout, ' from dynamic render')
      await new Promise(resolve => setTimeout(resolve, timeout));

      const res = await fetch('https://randomuser.me/api/?results=100', {cache: 'no-store'});
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const jsonData = await res.json();
      const prop_data = jsonData.results.map(record => record.dob.age);
  
      // Generating a timestamp in Eastern Time
      const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

      console.log("Finished loading dynamic render!!!!!!!!!!!!!!!!!!!!!")
  
      return { props: { prop_data: prop_data, prop_timestamp: easternTime } };
    } catch (error) {
      // Handle errors as needed, possibly passing an error message in props
      
      return { props: { error: error.message } };
    }
}





const DynamicHistogram = async ( {children} ) => {

    const dynamic_data = await getDataDynamicRendering()
    
    const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
   
    console.log('Dynamic Histogram', dynamic_data);

    return(
        // <div>
        //     {dynamic_data.props.prop_timestamp}
        //     {JSON.stringify(dynamic_data)}
        // </div>
  
        <div className={styles.data_display}>
            <p><b>Sample Data: Age Distribution</b></p>
            <p>Last Updated at {dynamic_data.props.prop_timestamp}</p>
            {dynamic_data.props.prop_timestamp}
            {JSON.stringify(dynamic_data)}
            <div className={`${styles.data_display2} plotly_plot`}>
                {console.log(Plot)}
                <Plot 
                className={`${styles.data_display2} plotly_plot`}
                data={[
                    {
                        x: [1,2,3,4,5,6],
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
             
            </div>
        </div>
    );

};

export default DynamicHistogram;