import Histogram from "./Histogram";

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

        console.log("from getDataDynamicRendering()");
    
        return { props: { prop_data: prop_data, prop_timestamp: easternTime } };
      } catch (error) {
        // Handle errors as needed, possibly passing an error message in props
        return { props: { error: error.message } };
      }
}
const HistogramWrapperDynamic = async () => {
    const dynamic_data = await getDataDynamicRendering();

    return(
        <Histogram prop_data = {dynamic_data.props.prop_data} prop_timestamp = {dynamic_data.props.prop_timestamp} id_name = {"from_dynamic_render"}></Histogram>
    )


};

export default HistogramWrapperDynamic;