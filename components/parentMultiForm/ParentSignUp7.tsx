import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetChild } from "store/parentChildSlice";

const ParentSignUp7 = () => {
   return (
      <div>
         <p className="text-2xl font-medium">Your child{`'`}s account has been created successfully!</p>
      </div>
   );
};

export default ParentSignUp7;
