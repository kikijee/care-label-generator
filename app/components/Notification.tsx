import * as React from 'react';
import Stack from '@mui/material/Stack';
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
    <Stack spacing={2} sx={{ width: '100%' }}>
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
    </Stack>
  );
};

export default Notification;
