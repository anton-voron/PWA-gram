import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { withRouter } from 'react-router-dom';
import useStyles from './useStyles';

interface LabelTabsI {
    history: any
}
const LabelTabs = (props: LabelTabsI) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const handleChange = (event: React.ChangeEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                props.history.push("/camera");
                break;
            case 1:
                props.history.push("/posts");
                break;
            case 2:
                props.history.push("/login");
                break;
            default:
                props.history.push("/posts");
                break;
        }
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<CameraAltIcon />} label="SNAPSHOT" />
                <Tab icon={<FavoriteIcon />} label="POSTS" />
                <Tab icon={<PersonPinIcon />} label="FRIENDS" />
            </Tabs>
        </Paper>
    );
};
export default withRouter(LabelTabs);
