import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import Header from "@/components/press/Header";
import Link from "next/link";
import { posts } from "public/blogdata";
import React from "react";

const Press = () => {
   return (
      <section className="min-h-screen w-full bg-[#ffffff]">
         <Navbar />
         <Header
            body="The Power of Gamification at CodeAlgo Academy"
            title={`Code and Play`}
            image="/assets/blog/learining.JPG"
            date="December 2023"
         />

         <section className="mx-auto mt-12 w-full max-w-[1100px] px-6">
            <div className="mt-8 grid grid-cols-1 items-center justify-center gap-[1rem] md:grid-cols-2 xl:grid-cols-3">
               {posts.map((post, index: number) => {
                  return (
                     <article
                        key={index}
                        className="mx-auto h-[400px] w-full max-w-[350px] rounded-[10px] border-[1.5px] bg-white p-4 shadow-sm transition-all hover:shadow-md"
                     >
                        {/* image container */}
                        <div className="h-[50%] w-full">
                           <img src={post.image} alt={post.title} className="h-full w-full rounded-[10px] object-cover object-center" />
                        </div>
                        <div className="mt-2 flex h-[50%] w-full flex-col justify-between py-2">
                           <div>
                              <h2 className="text-[1rem] font-bold text-[#222]">{post.title}</h2>
                              <p className="mt-2 text-[0.9rem] text-[#444]">{post.body.length > 120 ? `${post.body.slice(0, 121)}...` : post.body}</p>
                           </div>
                           <div className="flex items-center justify-between">
                              <p className="text-[14px] text-[#444]">{post.date}</p>
                              <Link href={`/blog${post.detailPage}`}>
                                 <button className="min-w-[100px] rounded-[20px] bg-orange-400 py-1 px-4 text-white">More</button>
                              </Link>
                           </div>
                        </div>
                     </article>
                  );
               })}
            </div>
         </section>
         <Footer />
      </section>
   );
};

export default Press;
