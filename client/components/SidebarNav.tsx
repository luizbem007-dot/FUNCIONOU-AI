import React, { useState, useEffect } from "react";
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
    icon: <Home className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    id: "conversas",
    label: "Conversas",
    icon: <MessageSquare className="w-5 h-5" />,
    path: "/conversas",
    badge: 12,
  },
  {
    id: "crm",
    label: "CRM",
    icon: <Eye className="w-5 h-5" />,
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
    label: "Disparo em Massa",
    icon: <Send className="w-5 h-5" />,
    path: "/disparo",
  },
  {
    id: "atendimentos",
    label: "Atendimentos",
    icon: <Phone className="w-5 h-5" />,
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
    icon: <Users className="w-5 h-5" />,
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
    icon: <Settings className="w-5 h-5" />,
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

interface SidebarNavProps {
  onNavigate?: () => void;
}

export default function SidebarNav({ onNavigate }: SidebarNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    new Set(["crm", "atendimentos", "adm", "config"]),
  );
  const userName = localStorage.getItem("userName") || "Usuário";

  const toggleMenu = (id: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedMenus(newExpanded);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
    onNavigate?.();
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
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg border border-[#00FF9A]/30 bg-[#0b0b0b] hover:border-[#00FF9A] transition-colors"
        aria-label="Menu"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-[#00FF9A]" />
        ) : (
          <Menu className="w-6 h-6 text-[#00FF9A]" />
        )}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 h-screen w-72 bg-[#0b0b0b] border-r border-[#00FF9A]/20 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#00FF9A]/20">
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
              alt="Funcionou.AI"
              className="h-8 w-8"
            />
            <div className="text-lg font-bold text-white">
              Funcionou.<span className="text-[#00FF9A]">AI</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[#00FF9A]/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <>
                  {/* Menu Item with Submenu */}
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isMenuActive(item)
                        ? "bg-[#00FF9A]/15 text-[#00FF9A] border border-[#00FF9A]/40"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedMenus.has(item.id) ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Submenu Items */}
                  {expandedMenus.has(item.id) && (
                    <div className="mt-1 ml-4 border-l border-[#00FF9A]/20 pl-3 space-y-1">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleNavigate(subitem.path!)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all text-left",
                            isActive(subitem.path)
                              ? "bg-[#00FF9A]/15 text-[#00FF9A]"
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
                /* Menu Item without Submenu */
                <button
                  onClick={() => handleNavigate(item.path!)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-[#00FF9A]/15 text-[#00FF9A] border border-[#00FF9A]/40"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#00FF9A]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
