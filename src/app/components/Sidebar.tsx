import React from "react";

// Images + Icons

const Sidebar = () => {
  return (
    <aside className="w-[20%] bg-gray-200">
      {/* Logo */}
      <div className="flex items-center text-2xl gap-2">
        <img
          src="./logo.png"
          alt=""
          className="h-[36px] w-[36px] object-cover"
        />
        <span>TaskFlow</span>
      </div>
    </aside>
  );
};

export default Sidebar;
