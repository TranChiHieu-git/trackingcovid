import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import LineChart from "../Chart/Linechart";
import Highmap from "../Chart/Highmap";

function Summary(props) {
    const [mapData, setMapData] = useState({});
    useEffect(() => {
        if (props.selectedCountry && props.selectedCountry !== "") {
            import(`@highcharts/map-collection/countries/${props.selectedCountry}/${props.selectedCountry}-all.geo.json`)
                .then((data) => {
                    setMapData(data);
                })
        }
    }, [props.selectedCountry]);
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart data={props.report}/>
            </Grid>
            <Grid item sm={4} xs={12}>
                <Highmap mapData={mapData}/>
            </Grid>
        </Grid>
    );
}

export default Summary;