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
import CreateWill from "../components/dashboard-testator/CreateWill";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [action, setAction] = useState("create_will");

  const actions = [
    // {
    //   action_type: "create_will",
    //   action_name: "Create Will",
    // },
    // {
    //   action_type: "add_beneficiary",
    //   action_name: "Add Beneficary By Address",
    // },
    // {
    //   action_type: "fetch_beneficiary",
    //   action_name: "Fetch Beneficiary By Address",
    // },
    // {
    //   action_type: "fetch_beneficiaries",
    //   action_name: "Fetch All Benficiaries",
    // },
    // {
    //   action_type: "testator_info",
    //   action_name: "View Testator Detail",
    // },
    // {
    //   action_type: "remove_beneficiary",
    //   action_name: "Remove Beneficiary",
    // },
    // {
    //   action_type: "logout",
    //   action_name: "Testator Logout",
    // },
  ];
  const Menus = [
    {
      action_type: "testator_profile",
      action_name: "View Testator Detail",
      title: "Profile",
    },
    {
      action_type: "create_will",
      action_name: "Create Will",
      title: "Create Will",
    },
    {
      action_type: "add_beneficiary",
      action_name: "Add Beneficary",
      title: "Add Beneficiary",
      icon: <ContactPageIcon />,
    },
    {
      action_type: "remove_beneficiary",
      action_name: "Remove Beneficiary",
      title: "Remove Beneficiary",
      // spacing: true,
    },
    {
      action_type: "fetch_beneficiary",
      action_name: "Fetch Beneficiary",
      title: "Fetch Beneficiary",
      // spacing: true,
      icon: <PermMediaIcon />,
    },
    {
      action_type: "fetch_beneficiaries",
      action_name: "Fetch All Benficiaries",
      title: "Fetch All Beneficiaries",
      icon: <AddReactionIcon />,
    },
    {
      action_type: "update",
      action_name: "Update",
      title: "Update",
      icon: <SettingsApplicationsIcon />,
    },

    {
      action_type: "logout",
      action_name: "Testator Logout",
      title: "Logout",
      icon: <LogoutIcon />,
    },

    // {
    //   title: "Fetch all Beneficiaries",
    //   submenu: true,
    //   icon: <AddReactionIcon />,
    //   submenuItems: [
    //     { title: "Submenu 1" },
    //     { title: "Submenu 2" },
    //     { title: "Submenu 3" },
    //   ],
    // },
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
          <Link href="/dashboard">
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
                items-center 
                   ${menu.spacing ? "mt-6" : "mt-2"}`}
              >
                <button
                  key={index}
                  onClick={() => {
                    setAction(action.action_type);
                  }}
                  className="flex items-center gap-x-4 cursor-pointer rounded px-1 hover:bg-white  hover:text-black duration-300 
                 bg-opacity-100"
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
                </button>
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
        {actions.map((action, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                setAction(action.action_type);
              }}
              className="bg-[#3b302f] text-white flex items-center content-center justify-start text-sm mt-3 w-full p-2 pl-5 pr-5 rounded-md"
            >
              {action.action_name}
            </button>
          );
        })}
        <div className="w-5/6 min-h-[100vh]">
          {action === undefined ? (
            <>
              <h1>Please Select an Action</h1>
            </>
          ) : (
            <>
              {action === "create_will" ? (
                <>
                  <CreateWill />
                </>
              ) : action === "add_beneficiary" ? (
                <>
                  <CreateWill />
                </>
              ) : action === "fetch_beneficiary" ? (
                <>
                  <CreateWill />
                </>
              ) : (
                <>
                  <CreateWill />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
