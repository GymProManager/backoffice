// src/utils/notifications.js
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message: any) => toast(message);

export const NotificationContainer = ToastContainer;
