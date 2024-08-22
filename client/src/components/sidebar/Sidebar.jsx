import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-300 p-4 flex flex-col gap-4">
        <SearchInput />
        <div className="border-t border-slate-300 my-2 px-3">
            <div className="mt-4">
                <Conversations/>
                <LogoutBtn />
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
