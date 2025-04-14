import { useAuthLogic } from '../../contexts/authContext';
import bowsvg from '../../assets/bow.svg';

const LoginComponent = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signInWithGoogle,
    handleLogin,
    handleClick,
  } = useAuthLogic();

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
            <form onSubmit={handleLogin}>
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
            <div className="form-control mt-4 place-items-center ">
              <label className="label flex justify-between">
                <span className="label-text">New User?</span>
              </label>
              <button onClick={handleClick} className="btn btn-secondary">
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

export default LoginComponent;