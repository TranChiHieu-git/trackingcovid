import React from 'react';
import {Card, CardContent, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props && props.item && props.item.type === "Confirmed") return {borderLeft: "5px solid #ff7600"};
        else if (props && props.item && props.item.type === "Recovered") return {borderLeft: "5px solid #28a745"};
        else if (props && props.item && props.item.type === "Deaths") return {borderLeft: "5px solid #ea0d0d"};
        else return {borderLeft: "5px solid gray"};
    }
});

function Item(props) {

    let classes = useStyles(props);
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2">{props.item.title}</Typography>
                <Typography component="span" variant="body2">{props.item.number}</Typography>
            </CardContent>
        </Card>
    );
}

export default Item;