"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import useAuth from "@/hooks/use-auth";
import useScrollPosition from "@/hooks/use-scroll";
import { routes } from "@/routes";

type Props = {};

const NavBar = (props: Props) => {
  const { isSignedIn, signOut } = useAuth();
  const scrollY = useScrollPosition();

  return (
    <header
      className={cx(
        "navbar bg-base-100 sticky top-0 z-50 w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 lg:container",
        {
          "shadow-md": scrollY >= 40,
        }
      )}
    >
      <div className="flex-1">
        <Link
          href={isSignedIn ? routes.tickets.list() : routes.root()}
          className="text-xl normal-case"
        >
          TicketBooth
        </Link>
      </div>
      <div className="flex-none">
        {isSignedIn ? (
          <div className="flex">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar z-50"
              >
                <div className="w-10 rounded-full">
                  <Image
                    priority
                    src="https://source.boringavatars.com/pixel/31/patrickjones.pmj@gmail.com?square"
                    alt="user avatar"
                    height={40}
                    width={40}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" href={"/settings"}>
                    Settings
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>

                <li>
                  <a onClick={async () => await signOut()}>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link
              href={routes.auth.signin()}
              className="btn btn-ghost text-l normal-case"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
