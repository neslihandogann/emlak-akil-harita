import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, MapPin, Brain } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("prediction-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-light/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium backdrop-blur-sm">
              <Brain className="w-4 h-4" />
              Yapay Zeka Destekli Emlak Analizi
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-slide-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Türkiye'nin En Akıllı
            <span className="block text-gradient mt-2">Emlak Fiyat Tahmini</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10" style={{ animationDelay: "0.2s" }}>
            Derin öğrenme algoritmaları ile emlak piyasasını analiz ederek, yatırım kararlarınızı 
            veriye dayalı şeffaf bilgilerle destekliyoruz.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 mb-16" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" onClick={scrollToForm}>
              <TrendingUp className="w-5 h-5" />
              Fiyat Tahmini Yap
            </Button>
            <Button variant="heroOutline" size="xl">
              <MapPin className="w-5 h-5" />
              Haritayı Keşfet
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-scale-in grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "50K+", label: "Analiz Edilen Mülk" },
              { value: "%94", label: "Tahmin Doğruluğu" },
              { value: "81", label: "İl Kapsamı" },
              { value: "7/24", label: "Anlık Tahmin" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
