import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    leftPanel: { //entire left panel
        height: '100%',
        //border: '2px solid black',
    },

    dashboard: { //dashboard on right
        height: '100%',
        //border: '2px solid black',
    },

}))