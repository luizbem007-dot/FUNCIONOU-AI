import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Send,
  Phone,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  Zap,
  Calendar,
  Tag,
  Database,
  Eye,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number;
  submenu?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="w-4 h-4" />,
    path: "/dashboard",
  },
  {
    id: "conversas",
    label: "Conversas",
    icon: <MessageSquare className="w-4 h-4" />,
    path: "/conversas",
    badge: 12,
  },
  {
    id: "crm",
    label: "CRM",
    icon: <Eye className="w-4 h-4" />,
    submenu: [
      {
        id: "crm-kanban",
        label: "Modo Kanban",
        icon: <BarChart3 className="w-4 h-4" />,
        path: "/crm/kanban",
      },
      {
        id: "crm-contatos",
        label: "Contatos",
        icon: <Users className="w-4 h-4" />,
        path: "/crm/contatos",
      },
      {
        id: "crm-mensagens",
        label: "Mensagens",
        icon: <MessageSquare className="w-4 h-4" />,
        path: "/crm/mensagens",
      },
      {
        id: "crm-tags",
        label: "Tags",
        icon: <Tag className="w-4 h-4" />,
        path: "/crm/tags",
      },
    ],
  },
  {
    id: "disparo",
    label: "Disparo",
    icon: <Send className="w-4 h-4" />,
    path: "/disparo",
  },
  {
    id: "atendimentos",
    label: "Atendimentos",
    icon: <Phone className="w-4 h-4" />,
    badge: 5,
    submenu: [
      {
        id: "atend-kanban",
        label: "Modo Kanban",
        icon: <BarChart3 className="w-4 h-4" />,
        path: "/atendimentos/kanban",
      },
      {
        id: "atend-agenda",
        label: "Agendamentos",
        icon: <Calendar className="w-4 h-4" />,
        path: "/atendimentos/agendamentos",
      },
      {
        id: "atend-msg",
        label: "Mensagens",
        icon: <MessageSquare className="w-4 h-4" />,
        path: "/atendimentos/mensagens",
      },
    ],
  },
  {
    id: "adm",
    label: "Adm",
    icon: <Users className="w-4 h-4" />,
    submenu: [
      {
        id: "adm-usuarios",
        label: "Usuários",
        icon: <Users className="w-4 h-4" />,
        path: "/adm/usuarios",
      },
      {
        id: "adm-setores",
        label: "Setores",
        icon: <Database className="w-4 h-4" />,
        path: "/adm/setores",
      },
    ],
  },
  {
    id: "config",
    label: "Configurações",
    icon: <Settings className="w-4 h-4" />,
    submenu: [
      {
        id: "config-geral",
        label: "Gerais",
        icon: <Settings className="w-4 h-4" />,
        path: "/configuracoes",
      },
      {
        id: "config-conexoes",
        label: "Conexões",
        icon: <Zap className="w-4 h-4" />,
        path: "/configuracoes/conexoes",
      },
    ],
  },
];

export default function TopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userName = localStorage.getItem("userName") || "Usuário";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("clientId");
    navigate("/", { replace: true });
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const isMenuActive = (item: MenuItem) => {
    if (item.path) return isActive(item.path);
    if (item.submenu) {
      return item.submenu.some((sub) => isActive(sub.path));
    }
    return false;
  };

  return (
    <nav className="bg-[#0b0b0b] border-b border-[#00FF9A]/20 sticky top-0 z-40">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
              alt="Funcionou.AI"
              className="h-6 w-6"
            />
            <div className="text-sm font-bold text-white hidden sm:block">
              Funcionou.<span className="text-[#00FF9A]">AI</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setOpenDropdown(
                        openDropdown === item.id ? null : item.id,
                      );
                    } else {
                      handleNavigate(item.path!);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                    isMenuActive(item)
                      ? "text-[#00FF9A] bg-[#00FF9A]/10 border border-[#00FF9A]/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item.id && (
                  <div className="absolute left-0 mt-1 w-48 bg-[#1a1a1a] rounded-lg border border-[#00FF9A]/20 shadow-2xl py-1 z-50">
                    {item.submenu.map((subitem) => (
                      <button
                        key={subitem.id}
                        onClick={() => handleNavigate(subitem.path!)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 text-xs hover:bg-white/5 transition-colors text-left",
                          isActive(subitem.path)
                            ? "text-[#00FF9A] bg-[#00FF9A]/10"
                            : "text-gray-400 hover:text-white",
                        )}
                      >
                        {subitem.icon}
                        <span>{subitem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden sm:flex items-center justify-center"
              aria-label="Notificações"
              title="Notificações"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF9A] rounded-full" />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-[#00FF9A]/20 bg-white/5 hidden sm:flex">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
              <span className="text-xs text-gray-300 truncate max-w-[100px]">
                {userName}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden sm:flex items-center justify-center"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="w-4 h-4 text-gray-400" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[#00FF9A]" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#00FF9A]/20 py-2 space-y-1 pb-4">
            {MENU_ITEMS.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.id ? null : item.id,
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform",
                          openDropdown === item.id && "rotate-180",
                        )}
                      />
                    </button>
                    {openDropdown === item.id && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-[#00FF9A]/20 pl-3">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.id}
                            onClick={() => handleNavigate(subitem.path!)}
                            className={cn(
                              "w-full flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition-colors text-left",
                              isActive(subitem.path)
                                ? "text-[#00FF9A] bg-[#00FF9A]/10"
                                : "text-gray-400 hover:text-white hover:bg-white/5",
                            )}
                          >
                            {subitem.icon}
                            <span>{subitem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigate(item.path!)}
                    className={cn(
                      "w-full flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors text-left",
                      isMenuActive(item)
                        ? "text-[#00FF9A] bg-[#00FF9A]/10 border border-[#00FF9A]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent",
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors lg:hidden"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
