import { Button, Chip, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Author } from "@/types";
import { sendMessage } from "@/messaging";
import ComponentProps from "@/interfaces/ComponentProps";

export default function Authors({ tab }: ComponentProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function onChangeSurname(event: React.ChangeEvent<HTMLInputElement>) {
        setSurname(event.target.value);
    }
    function onClickAdd() {
        setAuthors([...authors, { name: name, surname: surname }]);
        setName("");
        setSurname("");
    }
    function onDelete(index: number) {
        setAuthors(authors.filter((_, i) => i !== index));
    }

    async function onAddAuthorsClick() {
        console.log(authors);
        var response = await sendMessage("pasteAuthors", authors, tab.id);
        console.log(response);
    }
    return (
        <div>
            <Stack direction="row" spacing={2}>
                <TextField label="Nombre" onChange={onChangeName} value={name} />
                <TextField label="Apellido" onChange={onChangeSurname} value={surname} />
                <Button variant="contained" onClick={onClickAdd}>Añadir</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                {authors.map((author, index) => {
                    return (
                        <Chip key={index} label={author.name + " " + author.surname} icon={<PersonIcon />} onDelete={() => onDelete(index)} />
                    )
                }
                )}
            </Stack>
            <Button variant="contained" onClick={onAddAuthorsClick}>Añadir autores</Button>
        </div>
    )

}
