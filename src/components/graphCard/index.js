
import Plot from 'react-plotly.js';
import MediaQuery from "react-responsive/src";


const GraphCard = (props) => {
  const  limit=200;
    return(
    <div {...props}>

        <MediaQuery minDeviceWidth={460}>
            {(matches) =>
            matches ? <Plot
                data={[
                    {
                        x: props.time.slice(0,limit).reverse(),
                        y: props.temperature.slice(0,limit).reverse(),
                        type: 'scatter',
                        name:"Temperature",
                        mode: 'lines+markers',
                        marker: {
                            color: 'green',
                            size: 5,

                        },
                    },
                    {
                        x: props.time.slice(0,limit).reverse(),
                        y: props.humidity.slice(0,limit).reverse(),
                        type: 'scatter',
                        name:"Humidity",
                        mode: 'lines+markers',
                        marker: {
                            color: 'red',
                            size: 5,

                        },
                    }

                ]}
                layout={ {width:1000, height: 500,
                    yaxis: {range: [0, 300]}}}

            />: <Plot
                data={[
                    {
                        x: props.time.slice(0,limit).reverse(),
                        y: props.temperature.slice(0,limit).reverse(),
                        type: 'scatter',
                        name:"Temperature",
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {
                        x: props.time.slice(0,limit).reverse(),
                        y: props.humidity.slice(0,limit).reverse(),
                        type: 'scatter',
                        name:"Humidity",
                        mode: 'lines+markers',
                        marker: {color: 'green'},
                    }
                ]}
                layout={ {width:360, height:400,
                    yaxis: {range: [0, 300]}}}

            />
        }
        </MediaQuery>

    </div>);
};

export default GraphCard;