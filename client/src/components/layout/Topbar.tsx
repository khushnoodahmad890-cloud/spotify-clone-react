import {
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  ShieldCheck,
  Crown,
  CreditCard,
  Menu,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-16
        md:h-20
        px-4
        md:px-8
        bg-black/70
        backdrop-blur-xl
        border-b
        border-neutral-800
        flex
        items-center
        justify-between
      "
    >
      {/* Left */}

      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate(-1)}
          className="
            bg-neutral-900
            p-2
            rounded-full
            hover:bg-neutral-800
            transition
          "
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => navigate(1)}
          className="
            bg-neutral-900
            p-2
            rounded-full
            hover:bg-neutral-800
            transition
          "
        >
          <ChevronRight size={20} />
        </button>

        {/* Mobile Menu */}

        <button
          onClick={() => navigate("/profile")}
          title="Profile"
          className="
            md:hidden
            bg-neutral-900
            p-2
            rounded-full
            overflow-hidden
          "
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-[18px] h-[18px] rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <Menu size={18} />
          )}
        </button>

        {/* Search */}

        <button
          onClick={() => navigate("/search")}
          className="
            hidden
            md:flex
            items-center
            gap-3
            ml-3
            bg-neutral-900
            px-4
            py-2
            rounded-full
            hover:bg-neutral-800
            transition
          "
        >
          <Search size={18} />
          <span className="text-gray-400">
            Search music...
          </span>
        </button>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          className="
            bg-neutral-900
            p-2
            rounded-full
            hover:text-green-400
            transition
          "
        >
          <Bell size={18} />
        </button>

        <button
          onClick={() => navigate("/premium")}
          className="
            bg-neutral-900
            p-2
            rounded-full
            hover:text-yellow-400
            transition
          "
        >
          <Crown size={18} />
        </button>

        <button
          onClick={() => navigate("/billing")}
          className="
            hidden
            lg:flex
            items-center
            gap-2
            bg-neutral-900
            px-4
            py-2
            rounded-full
            hover:text-green-400
            transition
          "
        >
          <CreditCard size={18} />
          Billing
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="
            hidden
            lg:flex
            items-center
            gap-2
            bg-neutral-900
            px-4
            py-2
            rounded-full
            hover:text-green-400
            transition
          "
        >
          <ShieldCheck size={18} />
          Admin
        </button>

        {/* User */}

        <button
          onClick={() => navigate("/profile")}
          title="View profile"
          className="
            hidden
            sm:flex
            items-center
            gap-3
            bg-neutral-900
            rounded-full
            pl-2
            pr-4
            py-2
            hover:bg-neutral-800
            transition
          "
        >
          <div
            className="
              w-9
              h-9
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
              font-bold
              text-black
              uppercase
              overflow-hidden
              shrink-0
            "
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              user?.username?.charAt(0) || "U"
            )}
          </div>

          <span className="font-medium">
            {user?.username}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="
            bg-red-500/10
            p-2
            rounded-full
            hover:bg-red-500
            hover:text-white
            transition
          "
        >
          <LogOut size={18} />
        </button>

      </div>
    </header>
  );
}