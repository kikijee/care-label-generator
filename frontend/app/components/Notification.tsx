import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Define the props for the Notification component
interface NotificationProps {
  message: string;
  status: boolean | null;
  close: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

// Forward ref for the Alert component with types
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification: React.FC<NotificationProps> = ({ message, status, close }) => {
  return (
    <div style={{ position: "fixed", zIndex: 1300 }}> {/* Ensures it stays above other elements */}
      {status === true && (
        <Snackbar open={true} autoHideDuration={6000} onClose={close}>
          <Alert onClose={close} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
      {status === false && (
        <Snackbar open={true} autoHideDuration={6000} onClose={close}>
          <Alert onClose={close} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Notification;
