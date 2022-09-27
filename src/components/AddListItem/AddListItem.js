import { ThemeProvider } from "@emotion/react";
import {
    Button,
    createTheme,
    CssBaseline,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { getDarkMode } from "../DarkModeBtn/DarkModeButton";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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

export const AddListItem = () => {
    const [addItemText, setAddItemText] = React.useState("");
    let { id } = useParams();

    const addItem = () => {
        onAuthStateChanged(auth, async (user) => {
            if (addItemText.trim() !== user.uid && addItemText.trim() !== "") {
                const docSnap = await getDoc(doc(db, user.uid, id));
                if (docSnap.exists()) {
                    var newList = [];
                    newList = docSnap.data().items;
                    console.log(newList);
                    if (newList === undefined) {
                        newList = [];
                        newList.push(addItemText);
                    } else {
                        newList.push(addItemText);
                    }
                }

                setDoc(doc(db, user.uid, id), {
                    items: newList,
                    timestamp: serverTimestamp(),
                });
                setAddItemText("");
            }
        });
    };

    return (
        <ThemeProvider theme={getDarkMode() ? darkTheme : lightTheme}>
            <CssBaseline />
            <TextField
                variant="outlined"
                label="Item Name"
                placeholder="Leaving this blank will result in the item not being created"
                fullWidth
                onChange={(e) => {
                    setAddItemText(e.target.value);
                }}
            />
            <Button
                sx={{ marginTop: 1 }}
                onClick={() => {
                    addItem();
                }}
                fullWidth
                variant="contained"
            >
                <Link
                    style={{
                        textDecoration: "none",
                        width: "100%",
                    }}
                    to={`/view/${id}`}
                >
                    <Typography color="text.primary">Create</Typography>
                </Link>
            </Button>
        </ThemeProvider>
    );
};
