import {
  Home,
  Search,
  Library,
  ListMusic,
  Disc3,
  Shield,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: Home,
    },
    {
      to: "/search",
      label: "Search",
      icon: Search,
    },
    {
      to: "/library",
      label: "Library",
      icon: Library,
    },
    {
      to: "/queue",
      label: "Queue",
      icon: ListMusic,
    },
    {
      to: "/now-playing",
      label: "Player",
      icon: Disc3,
    },
    {
      to: "/admin",
      label: "Admin",
      icon: Shield,
    },
  ];

  return (
    <nav
      className="
        md:hidden
        fixed
        bottom-24
        left-0
        right-0
        h-20
        bg-black/95
        backdrop-blur-md
        border-t
        border-neutral-800
        flex
        items-center
        justify-around
        px-2
        z-40
      "
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `
                flex
                flex-col
                items-center
                gap-1
                text-[11px]
                transition-all
                ${
                  isActive
                    ? "text-green-500 scale-110"
                    : "text-gray-400 hover:text-white"
                }
              `
            }
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}