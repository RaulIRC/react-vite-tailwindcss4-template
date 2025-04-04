// AuthLogic.tsx (Functionality)
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider, db } from "../../firebase/firebaseConfig"; // Firebase auth and db configuration file
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const useAuthLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        profilePhoto: result.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate({ to: "/dashboard" }); // Redirect to the home page after successful login
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        navigate({ to: "/" }); // Redirect to the home page after successful login
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // const user = auth.currentUser;
      navigate({ to: "/dashboard" }); // Redirect to the dashboard after successful registration
      // if (user) {
      //     await setDoc(doc(db, "Users", user.uid), {
      //       email: user.email,
      //     });
      // }
    }
    catch (err) {
      console.log(err);
    }
}

  const handleClick = () => {
    navigate({
      to: "/register", // Redirect to the signup page for new users
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    signInWithGoogle,
    handleLogin,
    handleClick,
    handleRegister, // Expose handleRegister for the registration form if needed
  };
};