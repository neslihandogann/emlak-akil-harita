import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Eye, Layers, ZoomIn, ZoomOut } from "lucide-react";

const MapSection = () => {
  const [selectedCity, setSelectedCity] = useState("İstanbul");

  const investmentHotspots = [
    { city: "İstanbul", district: "Kadıköy", score: 92, growth: "+18%", price: "₺4.2M" },
    { city: "İstanbul", district: "Ataşehir", score: 88, growth: "+22%", price: "₺3.8M" },
    { city: "Ankara", district: "Çankaya", score: 85, growth: "+15%", price: "₺2.9M" },
    { city: "İzmir", district: "Konak", score: 82, growth: "+12%", price: "₺2.5M" },
    { city: "Antalya", district: "Konyaaltı", score: 89, growth: "+25%", price: "₺3.1M" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Yatırım Haritası
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Yatırım Potansiyeli Yüksek Bölgeler
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yapay zeka analizlerimiz ile belirlenen yüksek getiri potansiyeline sahip 
            bölgeleri harita üzerinde keşfedin.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] relative overflow-hidden border-0 shadow-lg">
              {/* Mock map background */}
              <div className="absolute inset-0 bg-navy-dark">
                {/* Turkey outline (simplified SVG) */}
                <svg
                  viewBox="0 0 800 400"
                  className="absolute inset-0 w-full h-full opacity-30"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                >
                  <path d="M150,200 Q200,150 300,160 Q400,140 500,150 Q600,160 700,180 Q720,200 700,220 Q650,250 550,260 Q450,280 350,270 Q250,260 180,240 Q150,230 150,200 Z" />
                </svg>

                {/* Heatmap overlay */}
                <div className="absolute inset-0">
                  {/* Istanbul heat */}
                  <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-accent/40 rounded-full blur-3xl animate-pulse-slow" />
                  {/* Ankara heat */}
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
                  {/* Izmir heat */}
                  <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-accent/35 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
                  {/* Antalya heat */}
                  <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-gold/30 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
                </div>

                {/* City markers */}
                <div className="absolute top-[35%] left-[28%] flex flex-col items-center group cursor-pointer">
                  <div className="w-4 h-4 bg-accent rounded-full shadow-glow animate-pulse" />
                  <span className="text-xs text-primary-foreground/80 mt-1 font-medium">İstanbul</span>
                </div>
                <div className="absolute top-[45%] left-[48%] flex flex-col items-center group cursor-pointer">
                  <div className="w-3 h-3 bg-accent/80 rounded-full" />
                  <span className="text-xs text-primary-foreground/60 mt-1">Ankara</span>
                </div>
                <div className="absolute top-[55%] left-[22%] flex flex-col items-center group cursor-pointer">
                  <div className="w-3 h-3 bg-accent/70 rounded-full" />
                  <span className="text-xs text-primary-foreground/60 mt-1">İzmir</span>
                </div>
                <div className="absolute top-[65%] left-[45%] flex flex-col items-center group cursor-pointer">
                  <div className="w-3 h-3 bg-gold rounded-full shadow-gold" />
                  <span className="text-xs text-primary-foreground/60 mt-1">Antalya</span>
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="bg-card/90 backdrop-blur-sm hover:bg-card">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-card/90 backdrop-blur-sm hover:bg-card">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" className="bg-card/90 backdrop-blur-sm hover:bg-card">
                  <Layers className="w-4 h-4" />
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 p-3 bg-card/90 backdrop-blur-sm rounded-lg">
                <div className="text-xs font-medium text-foreground mb-2">Yoğunluk Haritası</div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 rounded bg-accent/30" />
                  <span className="text-xs text-muted-foreground">Düşük</span>
                  <div className="w-4 h-2 rounded bg-accent/60" />
                  <span className="text-xs text-muted-foreground">Orta</span>
                  <div className="w-4 h-2 rounded bg-accent" />
                  <span className="text-xs text-muted-foreground">Yüksek</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Hotspots List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Öne Çıkan Bölgeler
            </h3>
            
            {investmentHotspots.map((spot, index) => (
              <Card 
                key={index}
                className="p-4 border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-gradient-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{spot.district}</h4>
                    <p className="text-sm text-muted-foreground">{spot.city}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    spot.score >= 90 ? "bg-accent/20 text-accent" : 
                    spot.score >= 85 ? "bg-gold/20 text-gold" : 
                    "bg-muted text-muted-foreground"
                  }`}>
                    Skor: {spot.score}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">{spot.growth}</span>
                    <span className="text-xs text-muted-foreground">yıllık</span>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{spot.price}</div>
                </div>
              </Card>
            ))}

            <Button variant="outline" className="w-full h-12">
              <Eye className="w-4 h-4 mr-2" />
              Tüm Bölgeleri Görüntüle
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
