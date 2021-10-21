import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SoldierList from './soldierList.js'
import EquipmentList from './equipmentList.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function LeftPanelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="standard"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonIcon />} label="SOLDIERS" />
        <Tab icon={<BuildIcon />} label="EQUIPMENT" />
        <Tab icon={<AssignmentTurnedInIcon />} label="TASKS" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SoldierList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EquipmentList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Tasks Under Construction
      </TabPanel>
    </Paper>
  );
}