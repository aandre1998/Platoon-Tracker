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


export default function Sections() {
  const classes = useStyles();

  const [sections, setSections] = useState([])

  const deleteSection = (id) => {
      axios.delete(`http://localhost:5000/sections/${id}`).then( () => {
          window.location.reload(false);
      })
  }

  useEffect(() => {
      axios.get('http://localhost:5000/sections').then( (allSections) => {
          setSections(allSections.data);
      } )
  }, [])

  return (
    <>
    <AddSection />
    </>
  );
}



/*
THE FOLLOWING CODE IS FOR THE + BUTTON AND SUBSEQUENT POP UP BOX, ADDS SECTION TO DB
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddSection() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [section, setSection] = useState({

    sectionName: '',
    slots: [],
    assigned: [],
    equipment: []
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    axios.post('http://localhost:5000/sections', section).then( () => {
        window.location.reload(false); //reloads the page on post data
    })
    setOpen(false);
  };

  const handleCloseCancel = () => {
    section.sectionName = '';
    section.slots = [];
    section.assigned = [];
    section.equipment = [];
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
        <DialogTitle id="alert-dialog-slide-title">{"Add New Section"}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Name" variant="outlined" value={section.sectionName} onChange={(event) => {
                setSection({ ...section, sectionName: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="Slots" variant="outlined" value={section.slots} onChange={(event) => {
                setSection({ ...section, slots: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="Assigned Soldiers" variant="outlined" value={section.assigned} onChange={(event) => {
                setSection({ ...section, assigned: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="Assigned Equipment" variant="outlined" value={section.equipment} onChange={(event) => {
                setSection({ ...section, equipment: event.target.value})
            }} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Add Section
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}