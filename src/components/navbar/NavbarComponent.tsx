/* DaisyUI TailwindCSS Navbar/Title Only Example: */

import { Link } from "@tanstack/react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import AvatarComponent from "../profile/AvatarComponent";
import { useEffect } from "react";

// Documentation: https://daisyui.com/components/navbar/

// This is considered a "Child Component"

const NavbarComponent = () => {

  const [ user ] = useAuthState(auth); // Replace with your user state management, e.g., useAuthState from Firebase or context.

  const isAuth = !!user; // Check if user is authenticated

  const log = (user: any): void => {
    console.log("Logging user information:", isAuth);
    console.log("User:", user);
  };

  useEffect(() => {
    if (user) {
      log(user);
    }
    else {
      console.log("No user is authenticated");
    }
  }, [user]);
  return (
  <>
  {/* Navbar */}
    <nav className="fixed w-full max-w-screen-lg px-4 py-2  shadow-md rounded-md lg:px-8 lg:py-3 mt-2 flex justify-center items-center">
        <div className="navbar rounded-lg m-0.1 top-0 duration-500 glass ease-in transition-colors border-2">
            <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">Budget4Free</Link>
            </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end ">
              <button>
                <AvatarComponent userName={user?.displayName ?? "User"} isAuth={isAuth} />
              </button>
              {/* This is where the dropdown menu starts */}
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  {!user ? (
                  <div className="justify-between">
                    <span className="line-through text-gray-400">
                    Dashboard
                    </span>
                    <span className="badge">Login to use</span>
                  </div>
                  ) : (
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                  </Link>
                  )}
                </li>
                <li>
                  {!user ? (
                  <span className="line-through text-gray-400">
                    Settings
                  </span>
                  ) : (
                  <Link to="/settings" className="text-center">
                    Settings
                  </Link>
                  )}
                </li>
                <li>
                  {!user ? (
                  <Link to="/auth">Login</Link>
                  ) : (
                    <Link
                    to="/"
                    onClick={async () => {
                      try {
                      await auth.signOut(); // Sign out the user using Firebase auth
                      // Optionally, you can redirect or show a message after sign out
                      console.log("User signed out successfully");
                      } catch (error) {
                      console.error("Error signing out:", error);
                      }
                    }}
                    >
                    Logout
                    </Link>
                  )}
                </li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
