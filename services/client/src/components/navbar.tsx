"use client";
import Link from "next/link";
import React, { use } from "react";

import { useCurrentUser } from "@/contexts/current-user";
import { routes } from "@/routes";

type Props = {};

const NavBar = (props: Props) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="navbar top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">TicketBooth</a>
      </div>
      <div className="flex-none">
        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}
        {currentUser ? (
          <Link
            href={routes.auth.signout()}
            className="btn btn-ghost normal-case text-l"
            // onClick={() => setCurrentUser(null)}
          >
            Sign Out
          </Link>
        ) : (
          <div>
            <Link
              href={routes.auth.signin()}
              className="btn btn-ghost normal-case text-l"
            >
              Sign In
            </Link>
          </div>
        )}
        {/* <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span className="text-xs">P</span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
