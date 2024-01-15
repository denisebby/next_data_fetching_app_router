import Histogram from "./Histogram";

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

        console.log("from getDataStaticRendering()");
    
        return { props: { prop_data: prop_data, prop_timestamp: easternTime } };
      } catch (error) {
        // Handle errors as needed, possibly passing an error message in props
        return { props: { error: error.message } };
      }    
}

const HistogramWrapperStatic = async () => {
    const static_data = await getDataStaticRendering();

    return(
        <Histogram prop_data = {static_data.props.prop_data} prop_timestamp = {static_data.props.prop_timestamp} id_name = {"from_static_render"}></Histogram>
    )


};

export default HistogramWrapperStatic;