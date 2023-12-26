import React from 'react'
import Head from 'next/head'
import Link from 'next/link';


// import DataDisplay from '../ui/server_fetch/ServerFetch'; // Import your display component

async function getData() {
  const res = await fetch('https://randomuser.me/api/?results=100',)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const jsonData = await res.json();
  const data = jsonData.results.map(record => record.dob.age);

  // Generating a timestamp in Eastern Time
  const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  return { results: { data:data, timestamp: easternTime } };
}


export default async function Sample() {

    const data = await getData();
  
    return (
    <>
    <div>
        Hi I'm Denis Ebby.
        <p><b>Data:</b> {JSON.stringify(data)}</p>

   
    </div>
    </>
  )
}
