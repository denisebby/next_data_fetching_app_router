async function getDataStaticRendering() {
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

const StaticHistogram = async () => {
    const static_data = await getDataStaticRendering();

    console.log('Static Histogram', static_data);

    return(
        <div>
            {static_data.props.prop_timestamp}
        </div>
    )

};

export default StaticHistogram;