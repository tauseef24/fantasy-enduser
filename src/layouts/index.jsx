import { Link, Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/NavbarComponent";
import Dropdown from "../components/navbar/Dropdown";

export default function Layout() {
  const loginStatus = localStorage.getItem("AccessToken");

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 py-2">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link className="flex items-center gap-2" href="/landing">
              <div className="w-10 h-10 sm:w-14 sm:h-14">
                {" "}
                {/* Adjusted for mobile */}
                <img
                  src="https://www.legitgambling.com/images/icons/dfs.svg"
                  alt=""
                />
              </div>
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link
                className="font-medium flex items-center text-lg transition-colors hover:text-violet-700"
                to="/landing"
              >
                Home
              </Link>
              <Link
                className="font-medium flex items-center text-lg transition-colors hover:text-violet-700"
                to="/aboutus"
              >
                About
              </Link>
              <Link
                className="font-medium flex items-center text-lg transition-colors hover:text-violet-700"
                to="/howtoplay"
              >
                How To Play
              </Link>
              <Link
                className="font-medium flex items-center text-lg transition-colors hover:text-violet-700"
                to="/pointsinfo"
              >
                Points Info
              </Link>
              <Dropdown />
            </nav>
            {!loginStatus ? (
              <div className="flex items-center gap-4">
                <Link
                  to={"/login"}
                  className="border border-slate-300 font-medium rounded-md px-4 py-1.5 text-sm hover:text-white hover:bg-violet-700 transition-all duration-100"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="border border-gray-900 font-medium text-white bg-black text-sm rounded-md px-4 py-1.5 transition-all duration-100 hover:text-white hover:bg-violet-700"
                >
                  Register
                </Link>
              </div>
            ) : (
              <NavbarComponent />
            )}
          </div>
        </div>
      </nav>
      <div className="mt-[56px] sm:mt-[72px] bg-gradient-to-tr h-screen from-violet-400 to-violet-200 flex-grow">
        {" "}
        {/* Adjust margin-top for mobile */}
        <Outlet />
      </div>
    </>
  );
}
