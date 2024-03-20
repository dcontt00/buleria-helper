import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"; // Import makeStyles from the correct package

interface CopyTextFieldProps {
    label: string;
    text: string;
    fullWidth?: boolean;
    multiline?: boolean;
}

export default function CopyTextField({ label, text, fullWidth, multiline }: CopyTextFieldProps) {

    const useStyles = makeStyles({
        shrink: {
            fontSize: '18px', // Cambia el tamaño de la fuente aquí
        },
    });

    const classes = useStyles(); // Assign the return value of useStyles to the classes variable

    async function onClickCopy() {
        await navigator.clipboard.writeText(text);
    }
    return (
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            value={text}
            fullWidth={fullWidth}
            multiline={multiline}
            InputProps={{
                style: { fontSize: "16px" },
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onClickCopy}>
                            <ContentPasteIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            InputLabelProps={{ shrink: true, classes: { shrink: classes.shrink }, style: { fontSize: "16px" } }}
        />
    )
}