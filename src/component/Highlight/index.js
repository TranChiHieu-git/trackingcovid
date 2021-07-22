import React from 'react';
import {Grid} from "@material-ui/core";
import Item from "./Item";

function Highlight(props) {
    return (
        <Grid container spacing={3}>
            {
                props.highlights && props.highlights.length > 0 && props.highlights.map((item) => <Grid item sm={4}>
                    <Item item={item} report={props.report}/>
                </Grid>)
            }

        </Grid>
    );
}

export default Highlight;