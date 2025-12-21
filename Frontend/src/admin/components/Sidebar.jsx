import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const base =
    "block px-4 py-2 rounded transition text-sm";
  const active =
    "bg-blue-100 text-blue-700 font-medium";
  const inactive =
    "text-gray-700 hover:bg-blue-50";

  const links = [
    ["Dashboard", "/admin/dashboard"],
    ["Users", "/admin/users"],
    ["Orders", "/admin/orders"],
    ["Products", "/admin/products"],
    ["Services", "/admin/services"],
    ["Contacts", "/admin/contacts"],
    ["Subscriptions", "/admin/subscriptions"]
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 text-xl font-bold text-blue-700">
        Raj Enterprise
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {links.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
