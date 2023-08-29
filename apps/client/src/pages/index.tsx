/* eslint-disable react/no-unescaped-entities */
import { Inter } from "next/font/google";

import RegisterUserForm from "@/components/forms/register-user-form";
import MainLayout from "@/components/layouts/main-layout";
import { useCurrentUser } from "@/contexts/current-user";
import { User } from "@/types/user";

import { NextPageWithLayout } from "./_app";

interface HomeProps {
  currentUser?: User;
}

const inter = Inter({ subsets: ["latin"] });
const Home: NextPageWithLayout<HomeProps> = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <div className="hero min-h-[60vh] bg-base-200">
        {!currentUser ? (
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4">
              <RegisterUserForm />
            </div>
            {/* <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">You're logged in!</div>
          </div>
        )}
      </div>
      <div className="bg-primary-content">
        <div className="container mx-auto px-4">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
              <div>
                <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900">
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Responsive
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Responsive, and mobile-first project on the web
                  </p>
                </div>
              </div>

              <div>
                <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900">
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z" />
                    <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z" />
                    <path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Customizable
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Components are easily customized and extendable
                  </p>
                </div>
              </div>

              <div>
                <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900">
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Documentation
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Every component and plugin is well documented
                  </p>
                </div>
              </div>

              <div>
                <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900">
                  <svg
                    className="w-7 h-7 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    24/7 Support
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Contact us 24 hours a day, 7 days a week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
