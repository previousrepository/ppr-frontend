import { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import StatusFilter from "./StatusFilter";
import { Filter, ArrowUpDown, Menu, LogOut } from "lucide-react";

const HeaderActions = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  showSearch = true,
  showFilter = true,
  showSort = false,
  sortValue,
  onSortChange,
  statuses = ["all", "approved", "pending", "rejected"],
  onLogout,
  showMenuButton = false,
}) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const statusRef = useRef(null);
  const sortRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setShowStatus(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2 md:flex-row md:items-center md:flex-wrap w-full md:w-auto relative">
      {/* 🔍 Search */}
      {showSearch && (
        <div className="w-full sm:w-auto">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search by title..."
          />
        </div>
      )}

      {/* 🔽 Filter */}
      {showFilter && (
        <div ref={statusRef} className="relative">
          <button
            onClick={() => setShowStatus((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <Filter className="w-4 h-5" />
            <span className={`hidden md:block`}>Filter</span>
          </button>

          {showStatus && (
            <div className="absolute right-0 z-10 mt-2 p-2 bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-all">
              <StatusFilter
                value={statusFilter}
                onChange={(status) => {
                  onStatusChange(status);
                  setShowStatus(false);
                }}
                statuses={statuses}
              />
            </div>
          )}
        </div>
      )}

      {/* ↕️ Sort */}
      {showSort && (
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setShowSortDropdown((prev) => !prev)}
            className="hidden md:flex items-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 z-10 mt-2 p-2 bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-all">
              <ul className="space-y-1">
                {[
                  { label: "Newest", value: "newest" },
                  { label: "Oldest", value: "oldest" },
                  { label: "Title A-Z", value: "title_asc" },
                  { label: "Title Z-A", value: "title_desc" },
                ].map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`block w-full text-left px-3 py-1 rounded-md text-sm ${
                        sortValue === option.value
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 🍔 Mobile Menu */}
      {showMenuButton && (
        <div ref={menuRef} className="relative md:hidden">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-7 w-36 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderActions;
