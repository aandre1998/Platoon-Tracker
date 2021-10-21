import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
});


export default function SoldierList() {
  const classes = useStyles();

  const [soldiersList, setSoldierList] = useState([])

  const deleteSoldier = (id) => {
      axios.delete(`http://localhost:5000/soldiers/${id}`).then( () => {
          window.location.reload(false);
      })
  }

  useEffect(() => {
      axios.get('http://localhost:5000/soldiers').then( (allSoldiers) => {
          setSoldierList(allSoldiers.data);
      } )
  }, [])

  return (
    <>
    <AddSoldier />
    {soldiersList.map((soldier, key) => (
        <p align="right">{soldier.soldierName}&emsp;{soldier.rank}&emsp;{soldier.mos}&emsp;
            <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteSoldier(soldier._id)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </p>

    ))}
    </>
  );
}



/*
THE FOLLOWING CODE IS FOR THE + BUTTON AND SUBSEQUENT POP UP BOX, ADDS SOLDIER TO DB
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddSoldier() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [soldier, setSoldier] = useState({

    soldierName: '',
    rank: '',
    mos: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    axios.post('http://localhost:5000/soldiers', soldier).then( () => {
        window.location.reload(false); //reloads the page on post data
    })
    setOpen(false);
  };

  const handleCloseCancel = () => {
    soldier.soldierName = '';
    soldier.rank = '';
    soldier.mos = '';
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="add" className={classes.margin} onClick={handleClickOpen}>
        <AddIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Add New Soldier"}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Name" variant="outlined" value={soldier.soldierName} onChange={(event) => {
                setSoldier({ ...soldier, soldierName: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="Rank" variant="outlined" value={soldier.rank} onChange={(event) => {
                setSoldier({ ...soldier, rank: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="MOS" variant="outlined" value={soldier.mos} onChange={(event) => {
                setSoldier({ ...soldier, mos: event.target.value})
            }} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Add Soldier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}