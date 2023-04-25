import Link from "next/link";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard" },
    { title: "Pages", icon: <ContactPageIcon /> },
    { title: "Media", spacing: true, icon: <PermMediaIcon /> },
    {
      title: "Projects",
      submenu: true,
      icon: <AddReactionIcon />,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics" },
    { title: "Inbox" },
    { title: "Profile", spacing: true },
    { title: "Setting", icon: <SettingsApplicationsIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-[#492823] h-screen p-5 pt-8 ${
          open ? "w-72" : "w-[125px]"
        } relative duration-300`}
      >
        <ArrowBackIcon
          fontSize="small"
          onClick={() => setOpen(!open)}
          className={`bg-white text-[#AE1B1B] text-3xl mt-5 
                                rounded-full absolute -right-3 top-10 
                                cursor-pointer ${
                                  !open && "rotate-180"
                                } duration-300 border border-[#AE1B1B]`}
        />
        <div className="inline-flex items-center text-white">
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              className={`object-scale-down mr-2 h-20 w-20 
                        bg-white rounded-full text-2xl 
                        cursor-pointer block float-left duration-500 ${
                          open && "rotate-[360deg]"
                        }`}
            />
          </Link>
          <h1
            className={`text-white origin-left font-medium ml-4 text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Anthophila
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-white bg-opacity-60 mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <SearchIcon
            onClick={() => setOpen(!open)}
            fontSize="small"
            className={`text-black  text-md block float-left cursor-left ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder={"Search"}
            className={`text-base bg-transparent w-full text-white focus:outline-none pl-2 ${
              !open && "hidden"
            }`}
          />
        </div>

        <ul className=" pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 
                text-small flex 
                items-center gap-x-4 cursor-pointer rounded px-1
                 hover:bg-white hover:text-black duration-300 
                 bg-opacity-100  ${menu.spacing ? "mt-6" : "mt-2"}`}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <DashboardIcon />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-500 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <ArrowDropDownIcon
                    className={`${submenuOpen && "rotate-180"} duration-500`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={index}
                      className="
                            text-gray-300 
                text-small flex 
                items-center gap-x-4 cursor-pointer rounded px-5
                 hover:bg-white hover:text-black duration-300 
                 bg-opacity-100 
                      "
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>

      <div className="p-7">
        <h1 className="text-2xl font-semibold"> Home Page</h1>
      </div>
    </div>
  );
};

export default Dashboard;
