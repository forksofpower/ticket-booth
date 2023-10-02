"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import useAuth from "@/hooks/use-auth";
import useScrollPosition from "@/hooks/use-scroll";
import { routes } from "@/routes";
import { isClient } from "@/utils/predicates";

type Props = {};

const NavBar = (props: Props) => {
  const { isSignedIn, signOut } = useAuth();
  const scrollY = useScrollPosition();

  async function handleSignOut() {
    return signOut();
  }

  return (
    <div
      className={cx(
        "navbar px-4 fixed top-0 z-30 transition-shadow duration-100 bg-opacity-90 backdrop-blur bg-base-100",
        {
          "shadow-md": scrollY >= 40,
        }
      )}
    >
      <div className="flex-1">
        <Link
          href={isSignedIn ? routes.tickets.list() : routes.root()}
          className="normal-case text-xl"
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
                className="menu menu-sm dropdown-content bg-base-200 z-[1] p-2 mt-3 shadow rounded-box w-52"
              >
                <li>
                  <Link className="justify-between" href={"/settings"}>
                    Settings
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>

                <li>
                  <a onClick={async () => await handleSignOut()}>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default NavBar;
