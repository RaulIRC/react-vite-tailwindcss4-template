// AuthLogic.tsx (Functionality)
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider, analytics } from "../../firebase/firebaseConfig"; // Firebase auth and db configuration file
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { logEvent } from "firebase/analytics";
import { useSettingsConfig, SettingsConfig } from "../../contexts/settingsContext/settingsContext"; // Importing the settings context
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAuthLogic = () => {
  // State variables for managing authentication and user data
  const [authing, setAuthing] = useState(false); // State to manage authentication status
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const navigate = useNavigate();

  const isAnalyticsEnabled = useState<boolean>(true);

  // We will be calling on this when we detect that there is no config. to apply default settings.

  const { settingsConfig, createConfig } = useSettingsConfig(); // State to hold settings configuration



  const [user] = useAuthState(auth);
  const userID = user?.uid || ""; 

  // const handleSettingsConfig = () => {
  //   console.log("Settings Config Check ", settingsConfig);

  //   if (settingsConfig[0]?.userId === userID) {
  //     const newConfig: SettingsConfig = {
  //       userId: user?.uid ?? "",
  //       monthlyBudget: 600,
  //       userName: '',
  //       currency: '',
  //       theme: ''
  //     }; // Initialize with userID.
  //     console.log("Creating new settings config:", newConfig);
  //     createConfig(newConfig); // Create default settings config
  //   }
  // }
  
  const logAnalyticsEvent = (eventName: string, eventParams: Record<string, any>) => {
    // Function to log events to Firebase Analytics only if it's enabled.
    if (isAnalyticsEnabled) {
      logEvent(analytics, eventName, eventParams); // Log the event for analytics if enabled
    }
  };

  // const handleAuth = async (authAction: (email: string, password: string) => Promise<any>, method: string) => {
  //   setAuthing(true);
  //   setError('');

  //   try {
  //     const result = await authAction(email, password);
  //     console.log({method}, 'successful:', result.user.uid);
  //     logAnalyticsEvent("login", {
  //       method: method,
  //       userID: result.user.uid
  //     })
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError(String(error));
  //     }
  //     console.error({method}, 'authentication failed:', error);
  //     setAuthing(false); // Consider adding this
  //   } finally {
  //     // Optional: Code that always runs, regardless of success or failure
  //     // setAuthing(false); // Alternatively, you could put it here
  //   }
  // }
  /* Login Page Logic */
  const signInWithGoogle = async () => {
    setAuthing(true); 

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log("Google sign-in successful:", result.user.uid);
        logAnalyticsEvent("login", {
          method: "Google",
          userID: result.user.uid,
        }); // Log the login event for analytics
        navigate({ to: "/" }); // Redirect to the home page after successful login
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
      setError(error.message); // Set the error message to be displayed
    })
    .finally(() => {
      // handleSettingsConfig();
      setAuthing(false); // Reset the authentication status
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    setAuthing(true); // Set authing to true while processing the sign-in
    setError(''); // Reset any previous error messages

    // Attempt to sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log("Email sign-in successful:", result.user.uid);
        logAnalyticsEvent("login", {
          method: "Email",
          userID: result.user.uid,
        }); // Log the login event for analytics
        navigate({ to: "/" }); // Redirect to the home page after successful login
      })
      .catch((error) => {
        console.error("Error during email sign-in:", error);
        setError(error.message); // Set the error message to be displayed
      })
      .finally(() => {
        // handleSettingsConfig();
        setAuthing(false); // Reset the authentication status
      });
  };

  /* Login Page Logic END */

  /* Sing Up Page Logic */

  const signUpWithGoogle = async () => {
    setAuthing(true); // Set authing to true while processing the sign-up
      
      signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (result) => {
          console.log("Google sign-up successful:", result.user.uid);
          logAnalyticsEvent("sign_up", {
            method: "Google",
            userID: result.user.uid,
          }); // Log the signup event for analytics
          navigate({ to: "/dashboard" }); // Redirect to the dashboard after successful signup
        })
        .catch((error) => {
          console.error("Error during Google sign-up:", error);
          setError(error.message); // Set the error message to be displayed
        })
        .finally(() => {
          // handleSettingsConfig();
          setAuthing(false); // Reset the authentication status
        });
  }

  const signUpWithEmail = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match."); // Set error if passwords do not match
      return;
    }

    setAuthing(true); // Set authing to true while processing the sign-up
    setError(''); // Reset any previous error messages

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log("Email sign-up successful:", result.user.uid);
        logAnalyticsEvent("sign_up", {
          method: "Email",
          userID: result.user.uid,
        });
        navigate({ to: "/dashboard" }); // Redirect to the dashboard after successful signup
      })
      .catch((error) => {
        console.error("Error during email sign-up:", error);
        setError(error.message); // Set the error message to be displayed
      })
      .finally(() => {
        // handleSettingsConfig(); // Call the function to handle settings configuration
        setAuthing(false); // Reset the authentication status
      });
  }



//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       const user = result.user;
//       if (user) {
//         const authInfo = {
//           userID: user.uid,
//           name: user.displayName,
//           profilePhoto: user.photoURL,
//           isAuth: true,
//         };
//         localStorage.setItem("auth", JSON.stringify(authInfo));
//         // Log the event for analytics
//         logEvent(analytics, "login", {
//           method: "Email",
//           userID: user.uid,
//         });
//         navigate({ to: "/" }); // Redirect to the home page after successful login
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);

//       navigate({ to: "/dashboard" }); // Redirect to the dashboard after successful registration
//     }
//     catch (err) {
//       console.log(err);
//     }
// }

  // const createAccountRedirect = () => {
  //   navigate({
  //     to: "/register", // Redirect to the signup page for new users
  //   });
  // };

  return {
    authing,
    setAuthing,
    error,
    setError,
    signUpWithGoogle,
    signUpWithEmail,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    signInWithGoogle,
    signInWithEmail,
    userID,
  };
};