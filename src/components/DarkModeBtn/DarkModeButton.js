import * as React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const DarkModeButton = (props) => {
    return (
        <IconButton
            sx={{}}
            onClick={() => {
                localStorage.setItem("darkMode", getDarkMode() ? false : true);
                window.location.reload(false);
            }}
            color="inherit"
        >
            {getDarkMode() ? <Brightness7Icon sx={{}} /> : <Brightness4Icon />}
        </IconButton>
    );
};

export const getDarkMode = () => {
    var data = localStorage.getItem("darkMode");
    if (data === undefined || data === null) {
        localStorage.setItem("darkMode", false);
    }
    return data === "true";
};
