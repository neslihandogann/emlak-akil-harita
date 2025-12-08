import { useEffect, useState } from "react";
import { TrendingUp, Building2, MapPin, Users } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: 50000,
    suffix: "+",
    label: "Analiz Edilen Mülk",
    description: "Türkiye genelinden toplanan veri",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Tahmin Doğruluğu",
    description: "RMSE/MAE doğrulanmış",
  },
  {
    icon: MapPin,
    value: 81,
    suffix: "",
    label: "İl Kapsamı",
    description: "Türkiye'nin tamamı",
  },
  {
    icon: Users,
    value: 12500,
    suffix: "+",
    label: "Aktif Kullanıcı",
    description: "Aylık tahmin sorgusu",
  },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString("tr-TR")}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/20 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-medium text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/60">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
