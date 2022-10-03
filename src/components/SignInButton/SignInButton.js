import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export function SignInButton() {
    const [user] = useAuthState(auth);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => {
                console.log(re);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {user ? (
                <Avatar alt={user.displayName} src={user.photoURL}></Avatar>
            ) : (
                <Button
                    variant="contained"
                    className="signInButton"
                    onClick={() => signInWithGoogle()}
                >
                    Sign in with google
                </Button>
            )}
        </div>
    );
}
