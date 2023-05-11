import React, { useEffect } from "react";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const ErrorPage = () => {
   const router = useRouter();
   useEffect(() => {
      if (!window.location.pathname.includes("/404")) {
         window.location.replace("404");
      }
   }, []);
   return (
      <>
         <Head>
            <title>Page Not Found!</title>
         </Head>
         <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 bg-[#ECEDF3] py-[40px]">
            <h1 className="text-[27px] font-bold text-[#2073fa] xs:text-[32px] sm:text-[64px] md:text-[100px] lg:text-[150px]">Oops!</h1>
            <p className="text-[18px] font-bold text-gray-800">The requested page {"doesn't"} exist</p>

            <button
               className="flex items-center gap-x-2 rounded-full bg-[#2073fa] py-2 px-6 text-[15px] font-bold text-white"
               onClick={() => {
                  router.back();
               }}
            >
               <span>
                  <FaArrowLeft />
               </span>
               Back
            </button>
         </div>
      </>
   );
};

export default ErrorPage;
