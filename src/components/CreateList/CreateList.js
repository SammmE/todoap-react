import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, createTheme, CssBaseline, Typography } from "@mui/material";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "@emotion/react";
import { getDarkMode } from "../DarkModeBtn/DarkModeButton";
import { Link } from "react-router-dom";
import { Title } from "../Title/Title";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const CreateList = () => {
    const [createText, changeCreateText] = React.useState("");

    const addList = async () => {
        onAuthStateChanged(auth, async (user) => {
            var exists = false;
            const docSnap = await getDoc(doc(db, user.uid, createText));
            if (docSnap.exists()) {
                exists = true;
            }
            if (
                createText.trim() !== user.uid &&
                createText.trim() !== "" &&
                exists === false
            ) {
                setDoc(doc(db, user.uid, createText.trim()), {
                    lists: [],
                    timestamp: serverTimestamp(),
                });
                changeCreateText("");
            }
        });
    };

    return (
        <ThemeProvider theme={getDarkMode() ? darkTheme : lightTheme}>
            <CssBaseline />
            <Title />
            <TextField
                variant="outlined"
                label="List Name"
                placeholder="Leaving this blank will result in the list not being created"
                fullWidth
                onChange={(e) => {
                    changeCreateText(e.target.value);
                }}
            />
            <Button
                sx={{ marginTop: 1 }}
                onClick={() => {
                    addList();
                }}
                fullWidth
                variant="contained"
            >
                <Link
                    style={{
                        textDecoration: "none",
                        width: "100%",
                    }}
                    to="/"
                >
                    <Typography color="text.primary">Create</Typography>
                </Link>
            </Button>
        </ThemeProvider>
    );
};
