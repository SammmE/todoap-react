import {
    Button,
    Card,
    CardContent,
    createTheme,
    CssBaseline,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    ThemeProvider,
    Typography,
} from "@mui/material";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { getDarkMode } from "../DarkModeBtn/DarkModeButton";

import AddIcon from "@mui/icons-material/Add";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import doneChime from "../../assets/done.mp3";
import { ConstructionOutlined } from "@mui/icons-material";

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

export const ViewList = (props) => {
    const [listItems, setListItems] = React.useState([]);
    const [isItems, setIsItems] = React.useState(false);

    let { id } = useParams();

    const withLink = (to, children) => (
        <Link style={{ textDecoration: "None" }} to={to}>
            <Typography color="text.primary">{children}</Typography>
        </Link>
    );

    const actions = [
        {
            icon: withLink(`/add/${id}`, <AddIcon />),
            name: "Add Item",
            operation: "addItem",
        },
    ];

    const getAllItems = () => {
        onAuthStateChanged(auth, async (user) => {
            const docSnap = await getDoc(doc(db, user.uid, id));
            if (docSnap.exists()) {
                setListItems(docSnap.data().items);
                if (listItems === []) {
                    setListItems([]);
                }
            }
        });
    };

    React.useEffect(getAllItems, []);

    return (
        <ThemeProvider theme={getDarkMode() ? darkTheme : lightTheme}>
            <CssBaseline />
            <Button sx={{ width: "100%" }} href="/" variant="contained">
                Go back
            </Button>
            {isItems ? (
                <div>
                    {listItems.map((name, index) => (
                        <div>
                            <Card variant="outlined" key={index}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 20 }}
                                        color="text.primary"
                                        gutterBottom
                                    >
                                        <Button
                                            sx={{
                                                marginRight: 10,
                                            }}
                                            onClick={() => {
                                                new Audio(doneChime).play();
                                                onAuthStateChanged(
                                                    auth,
                                                    async (user) => {
                                                        const docSnap =
                                                            await getDoc(
                                                                doc(
                                                                    db,
                                                                    user.uid,
                                                                    id
                                                                )
                                                            );
                                                        if (docSnap.exists()) {
                                                            var newList = [];
                                                            newList =
                                                                docSnap.data()
                                                                    .items;
                                                            newList.splice(
                                                                index,
                                                                1
                                                            );
                                                        }

                                                        setDoc(
                                                            doc(
                                                                db,
                                                                user.uid,
                                                                id
                                                            ),
                                                            {
                                                                items: newList,
                                                                timestamp:
                                                                    serverTimestamp(),
                                                            }
                                                        );
                                                        getAllItems();
                                                    }
                                                );
                                            }}
                                        >
                                            Done!
                                        </Button>
                                        {name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <Typography>Found no items in list. maybe reload?😕</Typography>
            )}

            <SpeedDial
                ariaLabel="actions"
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
};
