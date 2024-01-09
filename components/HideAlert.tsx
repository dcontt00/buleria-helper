import { Alert } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    severity: "success" | "info" | "warning" | "error";
    message: string;
}
export default function HideAlert({ show, setShow, severity, message }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (show) {
                setShow(false);
            }
        }, 2000);
        return () => {
            clearTimeout(timer);
        }

    }, [show])
    return (
        <>
            {
                show &&
                <Alert severity={severity} onClose={() => setShow(false)}>
                    {message}
                </Alert>
            }
        </>
    )

}