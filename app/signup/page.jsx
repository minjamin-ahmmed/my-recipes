import { Eye, EyeSlash, GoogleLogo } from "@phosphor-icons/react";

const Signup = () => {
  return (
    <div className="card w-full lg:w-[40%] mx-auto shrink-0 shadow-2xl rounded-xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 border border-orange-400 lg:p-6">
      <h1 className="text-2xl mt-5 px-5 lg:mt-0 lg:px-0 lg:text-4xl font-bold text-orange-600 text-center">
        Register Your Account
      </h1>

      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">PhotoURL</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="Please give a photoURL"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control relative">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered relative"
            required
          />

          <label className="label">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-8"
            >
              {showPassword ? <Eye size={32} /> : <EyeSlash size={32} />}
            </button>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#ff7029] border-none font-bold text-white">
            Register
          </button>
        </div>

        <div className="form-control mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-[#011b1c] font-bold text-[#ff7029] border border-[#ff7029]"
          >
            {" "}
            <GoogleLogo size={32} /> Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
