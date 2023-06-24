import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getChildren, rejectFriendRequest } from "store/parentChildSlice";
import { RootState } from "store/store";

const FriendRequests = () => {
   const dispatch = useDispatch();

   const currentChild = useSelector((state: RootState) => state.parentChild.currentChild);

   return (
      <div
         className="mt-14 h-[220px] w-full overflow-hidden overflow-y-scroll rounded-xl bg-[#eeeeee] py-2 px-4"
         data-testid="friend-requests-container"
      >
         {currentChild?.friendRequests?.map((friend, index: number) => {
            return (
               <article key={index} className="flex items-center justify-between gap-x-2 p-2" data-testid={`friend-req-${index}`}>
                  <span className="flex items-center gap-x-2 ">
                     <p className="font-lighter text-[12px]">{friend.from_user}</p>
                  </span>
                  <div className="flex items-center gap-x-2">
                     <i
                        className="cursor-pointer text-[12px] text-[#2073FA] underline"
                        onClick={async () => {
                           await dispatch(acceptFriendRequest(friend?.id));
                           await dispatch(getChildren());
                        }}
                     >
                        Accept
                     </i>
                     <i
                        className="cursor-pointer text-[12px] text-[#2073FA] underline"
                        onClick={async () => {
                           await dispatch(rejectFriendRequest(friend?.id));
                           await dispatch(getChildren());
                        }}
                     >
                        Decline
                     </i>
                  </div>
               </article>
            );
         })}
      </div>
   );
};

export default FriendRequests;