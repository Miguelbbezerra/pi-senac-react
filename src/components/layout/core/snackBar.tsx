import { Alert, Snackbar } from "@mui/material";

export interface SnackbarProps {
  open: boolean;
  handleClose: () => void;
  message?: string;
  type: 'error'|'warning'|'success'|'info'
}

const SnackBar = (props: SnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{horizontal:'center', vertical:'top'}}
      open={props.open}
      onClose={props.handleClose}
      autoHideDuration={5000}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.type}
        variant="filled"
        sx={{ width: "100" }}
      >{props.message}</Alert>
    </Snackbar>
  );
};
export default SnackBar