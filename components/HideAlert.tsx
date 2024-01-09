import { Alert } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
    showAlert: boolean;
    setShowAlert: (showAlert: boolean) => void;
    severity: "success" | "info" | "warning" | "error";
    message: string;
}
export default function HideAlert({ showAlert, setShowAlert, severity, message }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        }

    }, [])
    return (
        <>
            {
                showAlert &&
                <Alert severity={severity} onClose={() => setShowAlert(false)}>
                    {message}
                </Alert>
            }
        </>
    )

}