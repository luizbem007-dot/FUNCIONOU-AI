import React, { useState, useEffect } from "react";
import { MessageCircle, Users, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockData } from "@/mocks/premium-mock-data";

// Chart data com dados premium
const chartData = [
  { day: "Seg", mensagens: 4200, atendimentos: 3100 },
  { day: "Ter", mensagens: 3800, atendimentos: 2900 },
  { day: "Qua", mensagens: 5200, atendimentos: 4100 },
  { day: "Qui", mensagens: 4900, atendimentos: 3800 },
  { day: "Sex", mensagens: 6100, atendimentos: 4900 },
  { day: "Sáb", mensagens: 3200, atendimentos: 2100 },
  { day: "Dom", mensagens: 2900, atendimentos: 1800 },
];

const Dashboard = () => {
  const [statsData, setStatsData] = useState([
    {
      id: 1,
      title: "Mensagens Hoje",
      value: "247",
      change: "+12%",
      isPositive: true,
      icon: MessageCircle,
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "#10B981",
      bgGradient: "from-emerald-500 to-teal-500",
    },
    {
      id: 2,
      title: "Conversas Ativas",
      value: "8",
      change: "+3",
      isPositive: true,
      icon: Users,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "#3B82F6",
      bgGradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Pendências",
      value: "5",
      change: "-2",
      isPositive: true,
      icon: Clock,
      color: "from-orange-500/10 to-orange-500/5",
      iconColor: "#F59E0B",
      bgGradient: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Taxa de Conversão",
      value: "34.2%",
      change: "+5.1%",
      isPositive: true,
      icon: TrendingUp,
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "#A855F7",
      bgGradient: "from-purple-500 to-pink-500",
    },
  ]);

  const recentConversations = mockData.conversations.slice(0, 5);
  const topContacts = mockData.contacts.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] p-6">
        <h1 className="text-3xl font-bold mb-1">Bem-vindo ao seu painel! 👋</h1>
        <p className="text-gray-400">Aqui está um resumo do desempenho da sua Operação Funcionou.AI</p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="relative overflow-hidden rounded-2xl border border-[#1a1a2e] hover:border-[#00FF84]/50 transition-all duration-300 group"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Shine effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[#00FF84]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

                {/* Content */}
                <div className="relative p-5 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div
                      className="p-2.5 rounded-lg opacity-80 group-hover:opacity-100 transition-all"
                      style={{ backgroundColor: `${stat.iconColor}15` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: stat.iconColor }} />
                    </div>
                  </div>

                  {/* Change indicator */}
                  <div className="flex items-center gap-1">
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={stat.isPositive ? "text-emerald-500 text-xs font-medium" : "text-red-500 text-xs font-medium"}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-xs">vs. ontem</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 border border-[#1a1a2e] rounded-2xl p-6 hover:border-[#00FF84]/30 transition-colors duration-300">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Atividade da Semana</h2>
              <p className="text-sm text-gray-400">Mensagens e atendimentos por dia</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f0f1e",
                    border: "1px solid #1a1a2e",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                  cursor={{ fill: "#00FF84", opacity: 0.1 }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="mensagens" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="atendimentos" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {/* Conversion Funnel */}
            <div className="border border-[#1a1a2e] rounded-2xl p-6 hover:border-[#00FF84]/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Funil de Conversão</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Leads", value: "120", percent: 100 },
                  { label: "Contatos", value: "89", percent: 74 },
                  { label: "Negociação", value: "34", percent: 28 },
                  { label: "Fechados", value: "12", percent: 10 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="border border-[#1a1a2e] rounded-2xl p-6 hover:border-[#00FF84]/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">Performance</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Tempo médio de resposta", value: "3m 42s", status: "ótimo" },
                  { label: "Taxa de resolução", value: "87%", status: "bom" },
                  { label: "Satisfação cliente", value: "4.8/5", status: "ótimo" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="font-semibold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Conversations */}
          <div className="border border-[#1a1a2e] rounded-2xl p-6 hover:border-[#00FF84]/30 transition-colors">
            <h2 className="text-lg font-semibold mb-4">Conversas Recentes</h2>

            <div className="space-y-3">
              {recentConversations.map((conv) => (
                <div key={conv.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <span className="text-xl">{conv.clientAvatar}</span>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0a0a0a] ${
                          conv.status === "online"
                            ? "bg-emerald-500"
                            : conv.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-600"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{conv.clientName}</p>
                      <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    {conv.unreadCount > 0 && (
                      <span className="bg-[#00FF84] text-black text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 group-hover:text-gray-400">{conv.lastMessageTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contacts */}
          <div className="border border-[#1a1a2e] rounded-2xl p-6 hover:border-[#00FF84]/30 transition-colors">
            <h2 className="text-lg font-semibold mb-4">Top Contatos (CRM)</h2>

            <div className="space-y-2">
              {topContacts.map((contact, idx) => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl">{contact.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-400">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        contact.stage === "novo"
                          ? "bg-blue-500/20 text-blue-300"
                          : contact.stage === "em_atendimento"
                            ? "bg-orange-500/20 text-orange-300"
                            : contact.stage === "negociacao"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {contact.stage === "novo"
                        ? "Novo"
                        : contact.stage === "em_atendimento"
                          ? "Atendimento"
                          : contact.stage === "negociacao"
                            ? "Negociação"
                            : "Pós-venda"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
