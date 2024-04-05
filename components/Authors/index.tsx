import ComponentProps from "@/interfaces/ComponentProps";
import { Author } from "@/types";
import { sendMessage } from "@/utils/messaging";
import { capitalizeWords } from "@/utils/stringUtils";
import waitForTabComplete from "@/utils/tabUtils";
import AddIcon from '@mui/icons-material/Add';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Chip, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ProgressComponent from "../Progress";
export default function Authors({ tab }: ComponentProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [addAuthorsDisabled, setAddAuthorsDisabled] = useState<boolean>(true);
    const [removeAuthorsDisabled, setRemoveAuthorsDisabled] = useState<boolean>(true);

    const nameRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        async function fetchAuthors() {
            const storedAuthors: Author[] | null = await storage.getItem("local:authors");
            console.log(storedAuthors);
            if (storedAuthors) {
                setAuthors(storedAuthors);
                setRemoveAuthorsDisabled(false);
                setAddAuthorsDisabled(false);
            }
        }

        fetchAuthors();
    }, []);

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function onChangeSurname(event: React.ChangeEvent<HTMLInputElement>) {
        setSurname(event.target.value);
    }
    async function onClickAdd() {
        const temp = [...authors, { name: capitalizeWords(name), surname: capitalizeWords(surname) }]
        setAuthors(temp);
        setName("");
        setSurname("");
        setAddAuthorsDisabled(false);
        await storage.setItem("local:authors", temp);
        setRemoveAuthorsDisabled(false);
    }
    async function onDeleteAuthor(index: number) {
        setAuthors(authors.filter((_, i) => i !== index));
        await storage.setItem("local:authors", authors.filter((_, i) => i !== index));
        if (authors.length == 1) {
            setAddAuthorsDisabled(true);
        }
    }

    async function onAddAuthorsClick() {
        setAddAuthorsDisabled(true);
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
        setAddAuthorsDisabled(false);
    }
    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault(); // Previene la recarga de la página
        if (name == "" || surname == "") { return; }
        onClickAdd();
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }

    async function removeAuthorsFromPage() {
        await sendMessage("removeAuthors", null, tab.id);
    }

    async function removeAuthors() {
        setAuthors([]);
        await storage.removeItem("local:authors");
        setRemoveAuthorsDisabled(true);
        setAddAuthorsDisabled(true);
    }

    return (
        <Stack spacing={1}>
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={removeAuthorsFromPage}>Eliminar autores del envío</Button>
            <Box component="form" onSubmit={handleFormSubmit} >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body1">Añade los autores para introducirlos automáticamente en el envio</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Nombre" onChange={onChangeName} value={name} inputRef={nameRef} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Apellido" onChange={onChangeSurname} value={surname} />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" type="submit" fullWidth startIcon={<AddIcon />} sx={{ height: "100%" }} disabled={name == "" || surname == ""}>Añadir</Button>
                    </Grid>
                </Grid>
            </Box>
            <br />
            <Grid container spacing={1}>
                {authors.map((author, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip key={index} label={author.name + " " + author.surname} icon={<PersonIcon />} onDelete={() => onDeleteAuthor(index)} />
                        </Grid>
                    )
                }
                )}
                <Grid item xs={12}></Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth startIcon={<ContentPasteIcon />} onClick={onAddAuthorsClick} disabled={addAuthorsDisabled}>Pegar autores</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth startIcon={<DeleteIcon />} onClick={removeAuthors} disabled={removeAuthorsDisabled}>Eliminar autores</Button>
                </Grid>
            </Grid>
            <ProgressComponent progress={progress} showProgress={showProgress} progressText="Añadiendo autores" completeText="Añadidos autores" />
        </Stack>
    )

}
