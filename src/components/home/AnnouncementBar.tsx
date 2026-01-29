import { Truck, Globe, Shield } from "lucide-react";

const AnnouncementBar = () => {
  const announcements = [
    { icon: Truck, text: "Fast worldwide shipping available" },
    { icon: Globe, text: "Shipping to 50+ countries" },
    { icon: Shield, text: "100% authentic products guaranteed" },
  ];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="container-pharma">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {announcements.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <item.icon className="h-4 w-4" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
