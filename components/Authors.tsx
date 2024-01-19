import { Box, Button, Chip, Grid, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Author } from "@/types";
import { sendMessage } from "@/utils/messaging";
import ComponentProps from "@/interfaces/ComponentProps";
import waitForTabComplete from "@/utils/tabUtils";
import ProgressComponent from "./Progress";
import { capitalizeWords } from "@/utils/stringUtils";

export default function Authors({ tab }: ComponentProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const nameRef = useRef<HTMLInputElement>(null);

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function onChangeSurname(event: React.ChangeEvent<HTMLInputElement>) {
        setSurname(event.target.value);
    }
    function onClickAdd() {
        setAuthors([...authors, { name: capitalizeWords(name), surname: capitalizeWords(surname) }]);
        setName("");
        setSurname("");
        setButtonDisabled(false);
    }
    function onDelete(index: number) {
        setAuthors(authors.filter((_, i) => i !== index));
        if (authors.length == 1) {
            setButtonDisabled(true);
        }
    }

    async function onAddAuthorsClick() {
        setButtonDisabled(true);
        setProgress(0);
        var increment = 100 / authors.length;
        setShowProgress(true);
        for (let author of authors) {
            var response = await sendMessage("pasteAuthor", author, tab.id);
            console.log(response);
            // Esperar a que la pagina termine de cargar
            await waitForTabComplete(tab?.id);
            setProgress(oldProgress => oldProgress + increment);
        }
        setShowProgress(false);
        setButtonDisabled(false);
    }
    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault(); // Previene la recarga de la página
        if (name == "" || surname == "") { return; }
        onClickAdd();
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }

    return (
        <div>
            <Box component="form" onSubmit={handleFormSubmit} >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body1">Añade los autores para introducirlos automáticamente en el envio</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Nombre" onChange={onChangeName} value={name} inputRef={nameRef} />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Apellido" onChange={onChangeSurname} value={surname} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" type="submit" sx={{ height: "100%" }} disabled={name == "" || surname == ""}>Añadir</Button>
                    </Grid>
                </Grid>
            </Box>
            <br />
            <Grid container spacing={1}>
                {authors.map((author, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip key={index} label={author.name + " " + author.surname} icon={<PersonIcon />} onDelete={() => onDelete(index)} />
                        </Grid>
                    )
                }
                )}
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onAddAuthorsClick} disabled={buttonDisabled}>Añadir autores</Button>
                </Grid>
            </Grid>
            <ProgressComponent progress={progress} showProgress={showProgress} progressText="Añadiendo autores" completeText="Añadidos autores" />
        </div>
    )

}
