import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import React from "react";
import { BsBagFill, BsPinMapFill } from "react-icons/bs";

const StudentInternships = () => {
   return (
      <div className="relative overflow-x-hidden">
         <Navbar />
         <Image src={"/assets/home-banner.png"} width={1500} height={400} />

         <div className="mx-auto max-w-[1100px] p-6">
            <h1 className="text-center  font-thabit text-[2.1rem] font-bold">Show the world what you can do!</h1>

            <div className="mt-10 space-y-6">
               <SingleJob />
               <SingleJob />
               <SingleJob />
               <SingleJob />
            </div>
         </div>

         <Footer />
      </div>
   );
};

const SingleJob = () => {
   return (
      <article className="flex items-center gap-3 rounded-xl border border-mainBlack py-3 px-8 font-thabit">
         <div>
            <p className="max-w-fit rounded-[10px] bg-slate-300 p-2 text-[.8rem] font-semibold">50 Hours of CodeAlgo</p>

            <p className="mt-6">Software Engineer Internship Google Kansas City, MO</p>
            <div className="flex items-center gap-4">
               <p className="flex items-center gap-2 text-[.8rem]">
                  <span>
                     <BsBagFill className="text-gray-500" />
                  </span>
                  Google
               </p>
               <p className="flex items-center gap-2 text-[.8rem]">
                  <span>
                     <BsPinMapFill className="text-gray-500" />
                  </span>
                  Kansas City, MO
               </p>
            </div>

            <p className="mt-10 text-[.8rem]">
               50 Hours of CodeAlgo Now accepting online applications for immediate internship openings! Applicants must have completed 50 hours of
               CodeAlgo Python.
            </p>
         </div>

         <div className="min-w-fit max-w-fit">
            <CustomButton variant="filled" className="max-w-fit py-3 text-[.75rem] text-mainBlack">
               {"View Salary & More Info"}
            </CustomButton>
         </div>
      </article>
   );
};

export default StudentInternships;
