/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    createTheme,
    CssBaseline,
    Typography,
} from "@mui/material";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "@emotion/react";
import { getDarkMode } from "../DarkModeBtn/DarkModeButton";
import { Link } from "react-router-dom";
import doneChime from "../../assets/done.mp3";

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

export function Lists() {
    const withLink = (to, children) => (
        <Link style={{ textDecoration: "None" }} to={to}>
            <Typography color="text.primary">{children}</Typography>
        </Link>
    );
    const [allDocs, setAllDocs] = React.useState([]);
    const [isLists, setIsLists] = React.useState(false);

    const actions = [
        {
            icon: withLink("/create", <NoteAddIcon />),
            name: "Add Note",
            operation: "addNote",
        },
    ];
    const getAllData = async () => {
        onAuthStateChanged(auth, async (user) => {
            const querySnapshot = await getDocs(collection(db, user.uid));
            var docs = [];
            querySnapshot.forEach(async (docName) => {
                const docRef = doc(db, user.uid, docName.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    var docData = docSnap.data();
                }
                docs.push({
                    name: docName.id,
                    dateCreated: new Date(docData.timestamp * 1000),
                });
                setAllDocs(docs);
            }, []);
            if (allDocs !== []) {
                setIsLists(true);
            } else {
                setIsLists(false);
            }
        });
    };

    React.useEffect(() => {
        getAllData();
    }, []);

    return (
        <ThemeProvider theme={getDarkMode() ? darkTheme : lightTheme}>
            <CssBaseline />
            {isLists ? (
                <div>
                    {allDocs.map((d, index) => (
                        <Card variant="outlined" key={index}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {d.dateCreated.toString()}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    color="text.primary"
                                    gutterBottom
                                >
                                    {d.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    href={`/view/${d.name}`}
                                    variant="contained"
                                >
                                    View
                                </Button>
                                <Button
                                    sx={{ marginLeft: 2 }}
                                    variant="contained"
                                    onClick={() => {
                                        new Audio(doneChime).play();
                                        onAuthStateChanged(
                                            auth,
                                            async (user) => {
                                                deleteDoc(
                                                    doc(db, user.uid, d.name)
                                                );

                                                getAllData();
                                            }
                                        );
                                        getAllData();
                                    }}
                                >
                                    DELETE
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            ) : (
                <Typography>
                    Found no lists 😢. You may have to reload the page to get
                    newly created lists
                </Typography>
            )}

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((dialAction) => (
                    <SpeedDialAction
                        key={dialAction.name}
                        icon={dialAction.icon}
                        tooltipTitle={dialAction.name}
                    />
                ))}
            </SpeedDial>
        </ThemeProvider>
    );
}
