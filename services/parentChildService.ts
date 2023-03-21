import { IParentChild } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import http from "../axios.config";

const addChild = async (data: any) => {
   const response = await http.post("/parent/child/", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const addChildFriends = async (data: any) => {
   const response = await http.post("/parent/child/friend-request/", data, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   return response.data;
};

const getAllChildren = async () => {
   const response = await http.get("/parent/child/", {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });
   return response.data;
};

const updateChildScreentime = async (data: any, id: string | number) => {
   console.log(data);
   const response = await http.put(
      "/parent/child/time-limit/" + id + "/",
      { ...data },
      {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      }
   );

   return response.data;
};

const parentService = {
   addChild,
   addChildFriends,
   getAllChildren,
   updateChildScreentime,
};

export default parentService;
