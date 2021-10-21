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


export default function EquipmentList() {
  const classes = useStyles();

  const [equipmentList, setEquipmentList] = useState([])

  const deleteEquipment = (id) => {
      axios.delete(`http://localhost:5000/equipment/${id}`).then( () => {
          window.location.reload(false);
      })
  }

  useEffect(() => {
      axios.get('http://localhost:5000/equipment').then( (allEquipment) => {
          setEquipmentList(allEquipment.data);
      } )
  }, [])

  return (
    <>
    <AddEquipment />
    {equipmentList.map((equipment, key) => (
        <p align="right">{equipment.equipmentName}&emsp;{equipment.lin}&emsp;{equipment.quantity}&emsp;
            <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteEquipment(equipment._id)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </p>

    ))}
    </>
  );
}



/*
THE FOLLOWING CODE IS FOR THE + BUTTON AND SUBSEQUENT POP UP BOX, ADDS EQUIPMENT TO DB
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddEquipment() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [equipment, setEquipment] = useState({

    equipmentName: '',
    lin: '',
    quantity: null
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    axios.post('http://localhost:5000/equipment', equipment).then( () => {
        window.location.reload(false); //reloads the page on post data
    })
    setOpen(false);
  };

  const handleCloseCancel = () => {
    equipment.equipmentName = '';
    equipment.lin = '';
    equipment.quantity = null;
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
        <DialogTitle id="alert-dialog-slide-title">{"Add New Equipment Item"}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Item Name" variant="outlined" value={equipment.equipmentName} onChange={(event) => {
                setEquipment({ ...equipment, equipmentName: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="LIN" variant="outlined" value={equipment.lin} onChange={(event) => {
                setEquipment({ ...equipment, lin: event.target.value})
            }} /><br />
            <TextField id="outlined-basic" label="Quantity" variant="outlined" value={equipment.quantity} onChange={(event) => {
                setEquipment({ ...equipment, quantity: event.target.value})
            }} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}