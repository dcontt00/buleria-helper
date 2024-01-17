import { Button, Chip, Grid, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Author } from "@/types";
import { sendMessage } from "@/utils/messaging";
import ComponentProps from "@/interfaces/ComponentProps";
import waitForTabComplete from "@/utils/tabUtils";
import ProgressComponent from "./Progress";
import capitalizeWords from "@/utils/stringUtils";

export default function Authors({ tab }: ComponentProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

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

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <TextField label="Nombre" onChange={onChangeName} value={name} />
                <TextField label="Apellido" onChange={onChangeSurname} value={surname} />
                <Button variant="contained" onClick={onClickAdd}>Añadir</Button>
            </Stack>
            <Stack direction="column" spacing={2}>
                <Grid container spacing={1}>
                    {authors.map((author, index) => {
                        return (
                            <Grid item key={index}>
                                <Chip key={index} label={author.name + " " + author.surname} icon={<PersonIcon />} onDelete={() => onDelete(index)} />
                            </Grid>
                        )
                    }
                    )}
                </Grid>
                <Button variant="contained" onClick={onAddAuthorsClick} disabled={buttonDisabled}>Añadir autores</Button>
                <ProgressComponent progress={progress} showProgress={showProgress} progressText="Añadiendo autores" completeText="Añadidos autores" />
            </Stack>
        </div>
    )

}
