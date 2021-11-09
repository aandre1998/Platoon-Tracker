import logo from './logo.svg';
import {Container, AppBar, Typography, Grow, Grid, Paper} from '@material-ui/core';
import SoldierList from './components/leftPanel/soldierList.js';
import LeftPanelTabs from './components/leftPanel/leftPanelTabs.js';
import Sections from './components/dashboard/sections.js';
import './App.css';
import useStyles from './styles';


function App() {
  const classes = useStyles();
  document.body.style = 'background: Gainsboro;';
  return (
    <div className="App">
      <Container maxWidth="xl">
        
          <Typography className={classes.heading} variant="h4" align="center">Platoon Tracker</Typography>
          <Typography className={classes.heading} variant="h6" align="center">By 2LT Adam Andre</Typography>
          <br/>

        
          <Container maxWidth="xl">
            <Grid container spacing={2}>
        
              <Grid item xs={3}>
                <Paper elevation={3} className={classes.paper, classes.leftPanel}>
                    <LeftPanelTabs />
                </Paper>
              </Grid>
              <Grid item xs={9}>
                <Paper elevation={3} className={classes.paper, classes.dashboard}>
                    <Sections />
                </Paper>
              </Grid>
            </Grid>

          </Container>
        

      </Container>
    </div>
  );
}

export default App;