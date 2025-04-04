/* DaisyUI TailwindCSS Navbar/Title Only Example: */

import { Link } from "@tanstack/react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";

// Documentation: https://daisyui.com/components/navbar/

// This is considered a "Child Component"

const NavbarComponent = ({ navbarId }: { navbarId: string }) => {

  const [user] = useAuthState(auth); // Replace with your user state management, e.g., useAuthState from Firebase or context.

  return (
  <>
  {/* Navbar */}
    <nav className="fixed w-full max-w-screen-lg px-4 py-2 shadow-md rounded-md lg:px-8 lg:py-3 mt-2 flex justify-center items-center">
        <div className="navbar rounded-lg m-0.1 top-0 duration-500 ease-in transition-colors border-2">
            <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">Budget4Free</Link>
            </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
              </div>
              {/* This is where the dropdown menu starts */}
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                  {!user ? (
                    <>
                    <span className="line-through text-gray-400">
                      Dashboard
                    </span>
                    <span className="badge">Login to use</span>
                    </>
                  ) : (
                    <Link to="/dashboard">
                    Dashboard
                    <span className="badge">New</span>
                    </Link>
                  )}
                  </a>
                </li>
                <li>
                  <a>
                  {!user ? (
                  <span className="line-through text-gray-400">
                    Settings
                  </span>
                  ) : (
                  <Link to="/settings" className="text-center">
                    Settings
                  </Link>
                  )}
                  </a>
                </li>
                <li>
                  <a>
                  {!user ? (
                    <Link to="/auth">Login</Link>
                  ) : (
                    <Link to="/" onClick={() => auth.signOut()}>Logout</Link>
                  )}
                  </a>
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
