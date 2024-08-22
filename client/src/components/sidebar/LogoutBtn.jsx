import React from "react";
import {BiLogOut} from "react-icons/bi"
import useLogOut from "../../hooks/useLogOut";


const LogoutBtn = () => {

  const {loading, logout} = useLogOut()


  return (
    <div className="mr-20 ">
      {!loading ? <BiLogOut className="w-6 h-6 text-red-500 cursor-pointer" onClick={logout}/> : (
        <span className="loading loading-spinner"></span>
      )}
        
    </div>
  );
};

export default LogoutBtn;
