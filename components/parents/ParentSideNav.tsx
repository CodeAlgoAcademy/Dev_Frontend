import React, { useState } from "react";
import NavButton from "@/components/parents/NavButton";
import Image from "next/image";
import messageService from "services/messagesService";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const SideNav = ({unread}:{unread:number}) => {

   return (
      <div className="parent-sidenav sticky top-[-5.5rem] mr-[4%] mt-3 hidden h-full min-w-[240px] flex-auto flex-col gap-4 xl:flex">
         <div className="mx-auto max-w-fit">
            <Image src={"/assets/CodeAlgo_Logo.png"} alt="logo" loading="lazy" width={160} height={70} />
         </div>
         <div className="mt-5">
            <NavButton title="Main Dashboard" image="Dashboard.svg" url="/parents" />
         </div>
         <div className="relative">
            <NavButton title="Messages" image="message.svg" url="/parents/messages" notification={unread > 0 ? unread : ""} />
         </div>
         <div>
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">ACCOUNT</h2>
            <NavButton title="Billing" image="Billing.svg" url="/parents/billing" />
            <NavButton title="Student Accounts" image="people.svg" url="/parents/student" />
         </div>
         <div>
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">SAFETY</h2>
            <NavButton title="Screen Time" image="screen-time.svg" url="/parents/screen-time" />
            <NavButton title="Multiplayer" image="game.svg" url="/parents/multiplayer" />
         </div>
         <span className="justify-self-end text-center text-[#2073FA]">Get Help</span>
      </div>
   );
};

export default SideNav;
