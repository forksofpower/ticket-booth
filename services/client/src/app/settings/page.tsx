"use client";
import React from "react";

import { Input, Label } from "@/components/form-elements";
import ThemeToggle from "@/components/theme/theme-toggle";

type SettingsPageProps = {};

// function SettingsForm(props: { children: React.ReactNode }) {
//   return (
//     <form className="md:col-span-2">
//       <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
//         {props.children}
//       </div>

//       <div className="mt-8 flex">
//         <button
//           type="submit"
//           className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

function SettingsSection(props: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base-content font-semibold leading-7">
          {props.title}
        </h2>
        {props.description && (
          <p className="text-base-content mt-1 text-sm leading-6">
            {props.description}
          </p>
        )}
      </div>

      {props.children}
    </div>
  );
}

const SettingsPage = (props: SettingsPageProps) => {
  return (
    // <TitleCard topMargin={"mt-0"} title="General">
    <div className="grid grid-cols-1 gap-6">
      <div className="divide-base-300 divide-y">
        <SettingsSection title="Appearance" description="Change your theme">
          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <Label title="Theme" className="pb-1" />

                <div className="mt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </form>
        </SettingsSection>
        <SettingsSection
          title="Personal Information"
          description="Use a permanent address where you can receive mail."
        >
          <form className="form-control md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:max-w-xl sm:grid-cols-6">
              {/* <div className="col-span-full flex items-center gap-x-8">
                <Image
                  height={96}
                  width={96}
                  alt="avatar"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />{" "}
                <div>
                  <button
                    type="button"
                    className="btn btn-primary btn-outline btn-sm text-sm"
                  >
                    Change avatar
                  </button>
                  <p className="text-base-content mt-2 text-xs leading-5">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div> */}

              <div className="form-control col-span-full sm:col-span-3">
                <Label title="First Name" className="pb-1" />
                <Input type="text" name="first-name" id="first-name" />
              </div>

              <div className="form-control col-span-full sm:col-span-3">
                <Label title="Last Name" className="pb-1" />
                <Input type="text" name="last-name" id="last-name" />
              </div>

              <div className="form-control col-span-full">
                <Label title="Email Address" className="pb-1" />
                <Input type="text" name="email" id="email" />
              </div>

              <div className="form-control col-span-full">
                <Label title="Username" className="pb-1" />
                <div className="join w-full">
                  <span className="join-item bg-base-200 text-base-content flex select-none items-center px-3 sm:text-sm">
                    example.com/
                  </span>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    className="join-item w-full max-w-xs"
                  />
                </div>
              </div>

              {/* <div className="form-control col-span-full">
                <Label title="Timezone" className="pb-1" />
                <select
                  id="timezone"
                  name="timezone"
                  className="select select-bordered  w-full max-w-xs"
                >
                  <option>Pacific Standard Time</option>
                  <option>Eastern Standard Time</option>
                  <option>Greenwich Mean Time</option>
                </select>
              </div> */}
            </div>

            <div className="mt-8 flex">
              <button type="submit" className="btn btn-primary btn-outline">
                Save
              </button>
            </div>
          </form>
        </SettingsSection>
      </div>
    </div>
  );
};

export default SettingsPage;
