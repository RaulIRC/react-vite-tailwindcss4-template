import bowsvg from '../../assets/bow.svg';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from '@tanstack/react-router';
import { useAuthLogic } from '../../contexts/authContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSettingsConfig, defaultSettingsConfig } from '../../contexts/formContext/financial-record-context';


const LoginPage = () => {
  
  // Importing authentication logic from the context
  const {
    email,
    password,
    setEmail,
    setPassword,
    signInWithGoogle,
    signInWithEmail,
    createAccountRedirect,
  } = useAuthLogic();

  const navigate = useNavigate();
  const [ user ] = useAuthState(auth);
  

  if (user) {
    // Redirect to the login page if the user is not logged in
    navigate({
      to: '/dashboard', // Redirect to login page
      replace: true, // Replace the current entry in the history stack
    });
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card w-full max-w-sm drop-shadow-2xl bg-base-200"> 
            <div className="absolute top-0 right-0 m-2 mt-2">
            <img
              src={bowsvg}
              alt="Decorative"
              className="w-12 h-12 rounded-full rotate-25 shadow-lg mask mask-squircle active:glass"
            />
            </div>
          <div className="card-body">
            <h2 className="card-title self-center">Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              signInWithEmail(email, password);
            }}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-4 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            <div className="form-control mt-4 text-center">
              <label className="label flex justify-center">
                <span className="label-text">New User?</span>
              </label>
              <button onClick={createAccountRedirect} className="btn btn-secondary">
                Create an account
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="form-control">
              <p className="text-center mb-2">Sign in with Google to Continue</p>
              <button onClick={signInWithGoogle} className="btn btn-accent flex items-center justify-center w-full active:glass">
                Sign In With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;