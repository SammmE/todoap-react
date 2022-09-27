import "./title.css";
import { SignInButton } from "../SignInButton/SignInButton";
import { DarkModeButton } from "../DarkModeBtn/DarkModeButton";

export function Title(props) {
    return (
        <div className="titleContainer">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
                rel="stylesheet"
            />
            <h1 className="title">To Do App</h1>

            <DarkModeButton />
            <SignInButton />
        </div>
    );
}
