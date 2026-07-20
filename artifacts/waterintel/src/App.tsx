import React, { useEffect } from 'react';
import { 
  Droplet, 
  LayoutDashboard, 
  FolderOpen, 
  MapPin, 
  Workflow, 
  Server, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  SlidersHorizontal, 
  BarChart3, 
  Bot,
  Search,
  ChevronDown,
  Bell
} from 'lucide-react';

function Shell() {
  // Navigation configuration
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: FolderOpen, label: 'Projects', active: false },
    { icon: MapPin, label: 'Site Finder', active: false },
    { icon: Workflow, label: 'Water Infrastructure', active: false },
    { icon: Server, label: 'Data Centers', active: false },
    { icon: FileText, label: 'Documents & Reports', active: false },
    { icon: MessageSquare, label: 'AI Chat Assistant', active: false },
    { icon: BookOpen, label: 'Regulatory Guide', active: false },
    { icon: SlidersHorizontal, label: 'Compare Sites', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0A0E17] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar */}
      <div className="w-[240px] flex-shrink-0 bg-[#0B1220] flex flex-col h-full border-r border-[#1F2937]">
        {/* Logo Area */}
        <div className="pt-6 pb-4 px-4 flex flex-col gap-1 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <Droplet className="w-[28px] h-[28px] text-[#10B981]" fill="currentColor" fillOpacity={0.2} />
            <span className="text-[18px] font-bold text-white tracking-wide">WaterIntel</span>
          </div>
          <p className="text-[10px] text-[#6B7280] leading-snug mt-1">
            AI-Powered Water Intelligence Platform
          </p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`
                  flex items-center gap-3 px-3 py-[10px] rounded-md cursor-pointer transition-colors relative
                  ${item.active 
                    ? 'bg-[#10B981]/15 text-[#10B981]' 
                    : 'text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-white/5'
                  }
                `}
              >
                {item.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#10B981] rounded-l-md" />
                )}
                <Icon className={`w-4 h-4 ${item.active ? 'text-[#10B981]' : 'text-[#6B7280]'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Current Project Card */}
        <div className="px-3 mb-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
            <p className="text-[10px] uppercase text-[#6B7280] font-semibold tracking-wider mb-1">
              Current Project
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span className="text-[13px] font-semibold text-white">Riyadh Data Campus</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Power</span>
                <span className="text-white font-medium">150 MW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Cooling</span>
                <span className="text-white font-medium">Hybrid Dry/Wet</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Target Year</span>
                <span className="text-white font-medium">2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Card */}
        <div className="px-3 mb-4">
          <div className="bg-[#0F1A2E] border border-[#1E3A5F] rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#10B981]" />
              <span className="text-[13px] font-bold text-white">Need help?</span>
            </div>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-1">
              Ask our AI assistant anything about water, regulations, or site selection.
            </p>
            <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium py-2 rounded-md transition-colors">
              Start AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Right Column (Top Bar + Main Content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-[60px] flex-shrink-0 bg-[#0A0E17] border-b border-[#1F2937] flex items-center justify-between px-6">
          
          {/* Left Side: Search */}
          <div className="relative w-[320px]">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search for a location, plant, project..."
              className="w-full h-9 bg-[#111827] border border-[#1F2937] rounded-lg pl-9 pr-3 text-[13px] text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Location Selector */}
            <button className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937]/50 rounded-md h-9 px-3 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[13px] font-medium text-white">Riyadh, Saudi Arabia</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-[#6B7280] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0A0E17]" />
            </button>

            <div className="h-6 w-[1px] bg-[#1F2937] mx-1"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-teal-900/50 border border-teal-700/50 flex items-center justify-center text-teal-400 font-semibold text-xs group-hover:border-teal-500 transition-colors">
                RA
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-white leading-tight">Razan Alateeb</span>
                <span className="text-[11px] text-[#6B7280] leading-tight mt-0.5">Developer</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#0A0E17] flex items-center justify-center">
          <p className="text-[#374151] text-sm">Main content area</p>
        </div>
      </div>
      
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <Shell />;
}

export default App;
