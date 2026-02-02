import { Truck, Globe, Shield } from "lucide-react";

const AnnouncementBar = () => {
  const announcements = [
    { icon: Truck, text: "Fast worldwide shipping" },
    { icon: Globe, text: "50+ countries" },
    { icon: Shield, text: "100% authentic" },
  ];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="container-pharma">
        {/* Mobile: Horizontal scroll */}
        <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 lg:gap-16 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {announcements.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm whitespace-nowrap flex-shrink-0"
            >
              <item.icon className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;