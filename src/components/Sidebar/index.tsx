import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdFactory, MdAnalytics } from "react-icons/md";
import { FaMicrochip } from "react-icons/fa";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const menuItems = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Machine Detail", path: "/machine-detail", icon: FaMicrochip },
  { label: "Analytics", path: "/analytics", icon: MdAnalytics },
  { label: "Plant", path: "/plant", icon: MdFactory },
];

const Sidebar: FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-40
          w-64 bg-white border-r h-full
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 font-semibold text-lg border-b">
          IOT Dashboard
        </div>

        <nav className="p-3 flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  p-2 rounded-lg
                  text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  `
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
