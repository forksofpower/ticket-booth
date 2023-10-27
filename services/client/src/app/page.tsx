/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";

import RegisterUserForm from "@/components/forms/register-user-form";
import useAuth from "@/hooks/use-auth";
import cn from "@/utils/classnames";

// tailwind requires full class names to be present in the html
const panels = [
  "bg-teal-700",
  "bg-teal-600",
  "bg-teal-500",
  "bg-teal-400",
  "bg-teal-300",
  "bg-teal-200",
  "bg-teal-100",
];

function Hero() {
  const { isSignedIn } = useAuth();
  return (
    <>
      <div className="hero bg-base-200 min-h-[60vh]">
        {!isSignedIn ? (
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm flex-shrink-0 p-4 shadow-2xl">
              {/* <RegisterUserForm /> */}
            </div>
          </div>
        ) : (
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">You're logged in!</div>
          </div>
        )}
      </div>
    </>
  );
}
const HomePage = () => {
  return (
    <>
      <Hero />
      {panels.map((bgColor, index) => (
        <div
          key={`panel-${index}`}
          className={cn("h-[100vh]", bgColor, {
            "snap-end": index === panels.length - 1,
          })}
        ></div>
      ))}
      <div />
      <footer
        className="bg-gradient-radial footer footer-center text-accent-content fixed bottom-0 left-0 right-0 -z-50 h-48
      from-pink-500 via-red-500 to-yellow-500 p-4"
      >
        <aside>
          <p className="font-bold">Copyright © 2023 - Patrick Jones</p>
        </aside>
      </footer>
    </>
  );
};

export default HomePage;
