import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface CopyTextFieldProps {
    label: string;
    text: string;
    fullWidth?: boolean;
    multiline?: boolean;
}

export default function CopyTextField({ label, text, fullWidth, multiline }: CopyTextFieldProps) {
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
                readOnly: true, endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onClickCopy}>
                            <ContentPasteIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}