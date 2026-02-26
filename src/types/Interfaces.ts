import { AlertProps } from "@mui/material";

export interface IFlashMessage {
    open: boolean;
    message: string;
    severity?: AlertProps["severity"];
}