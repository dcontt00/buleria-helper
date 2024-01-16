import { Button, Chip, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
export default function Authors() {
    const [authors, setAuthors] = useState<{ name: string, surname: string }[]>([]);
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
        </div>
    )

}
