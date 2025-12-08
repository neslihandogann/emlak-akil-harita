import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Eye, Layers, ZoomIn, ZoomOut, Navigation, Info } from "lucide-react";

interface HotspotData {
  id: number;
  city: string;
  district: string;
  score: number;
  growth: string;
  price: string;
  avgPrice: number;
  x: number;
  y: number;
}

const hotspots: HotspotData[] = [
  { id: 1, city: "İstanbul", district: "Kadıköy", score: 92, growth: "+18%", price: "₺4.2M", avgPrice: 42000, x: 28, y: 32 },
  { id: 2, city: "İstanbul", district: "Ataşehir", score: 88, growth: "+22%", price: "₺3.8M", avgPrice: 38000, x: 30, y: 34 },
  { id: 3, city: "Ankara", district: "Çankaya", score: 85, growth: "+15%", price: "₺2.9M", avgPrice: 29000, x: 48, y: 42 },
  { id: 4, city: "İzmir", district: "Konak", score: 82, growth: "+12%", price: "₺2.5M", avgPrice: 25000, x: 22, y: 52 },
  { id: 5, city: "Antalya", district: "Konyaaltı", score: 89, growth: "+25%", price: "₺3.1M", avgPrice: 31000, x: 45, y: 68 },
  { id: 6, city: "Bursa", district: "Nilüfer", score: 78, growth: "+14%", price: "₺2.2M", avgPrice: 22000, x: 35, y: 38 },
  { id: 7, city: "Trabzon", district: "Ortahisar", score: 75, growth: "+20%", price: "₺1.8M", avgPrice: 18000, x: 62, y: 28 },
  { id: 8, city: "Gaziantep", district: "Şahinbey", score: 72, growth: "+10%", price: "₺1.5M", avgPrice: 15000, x: 58, y: 55 },
];

const InteractiveMap = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [zoom, setZoom] = useState(1);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setSelectedHotspot(null);
  };

  const getHeatColor = (score: number) => {
    if (score >= 90) return "bg-accent";
    if (score >= 85) return "bg-accent/80";
    if (score >= 80) return "bg-gold";
    if (score >= 75) return "bg-gold/70";
    return "bg-muted-foreground/50";
  };

  const getHeatGlow = (score: number) => {
    if (score >= 90) return "shadow-[0_0_30px_rgba(34,197,94,0.5)]";
    if (score >= 85) return "shadow-[0_0_25px_rgba(34,197,94,0.4)]";
    if (score >= 80) return "shadow-[0_0_20px_rgba(234,179,8,0.4)]";
    return "";
  };

  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            İnteraktif Yatırım Haritası
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Yatırım Potansiyeli Yüksek Bölgeler
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yapay zeka analizlerimiz ile belirlenen yüksek getiri potansiyeline sahip 
            bölgeleri harita üzerinde keşfedin. Noktalara tıklayarak detaylı bilgi alın.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map Area */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden border-0 shadow-lg" style={{ height: "550px" }}>
              {/* Map Container */}
              <div 
                ref={mapRef}
                className="absolute inset-0 bg-navy-dark transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                {/* Turkey map SVG */}
                <svg
                  viewBox="0 0 100 80"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Simplified Turkey outline */}
                  <defs>
                    <linearGradient id="turkeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="hsl(var(--navy))" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M15,35 Q20,25 35,28 Q50,22 65,25 Q80,28 90,35 Q92,40 88,48 Q80,55 65,58 Q50,62 35,60 Q22,58 18,50 Q15,42 15,35 Z"
                    fill="url(#turkeyGradient)"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.3"
                    className="opacity-60"
                  />
                  {/* City regions */}
                  <circle cx="28" cy="32" r="8" fill="hsl(var(--accent))" fillOpacity="0.15" />
                  <circle cx="48" cy="42" r="6" fill="hsl(var(--accent))" fillOpacity="0.12" />
                  <circle cx="22" cy="52" r="5" fill="hsl(var(--accent))" fillOpacity="0.1" />
                  <circle cx="45" cy="68" r="6" fill="hsl(var(--gold))" fillOpacity="0.15" />
                </svg>

                {/* Heatmap Overlays */}
                {showHeatmap && hotspots.map((spot) => (
                  <div
                    key={`heat-${spot.id}`}
                    className="absolute rounded-full blur-2xl transition-opacity duration-500"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      width: `${Math.max(60, spot.score)}px`,
                      height: `${Math.max(60, spot.score)}px`,
                      transform: "translate(-50%, -50%)",
                      background: spot.score >= 85 
                        ? `radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 70%)`
                        : `radial-gradient(circle, hsl(var(--gold) / 0.3), transparent 70%)`,
                    }}
                  />
                ))}

                {/* Hotspot Markers */}
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    className={`absolute group transition-all duration-300 ${
                      selectedHotspot?.id === spot.id ? "z-20" : "z-10"
                    }`}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setSelectedHotspot(spot)}
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    {/* Pulse animation */}
                    <div className={`absolute inset-0 rounded-full animate-ping ${getHeatColor(spot.score)} opacity-30`} style={{ animationDuration: "2s" }} />
                    
                    {/* Marker */}
                    <div className={`relative w-5 h-5 rounded-full ${getHeatColor(spot.score)} ${getHeatGlow(spot.score)} 
                      flex items-center justify-center cursor-pointer
                      transform transition-transform duration-200 group-hover:scale-125
                      ${selectedHotspot?.id === spot.id ? "scale-150 ring-2 ring-primary-foreground" : ""}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>

                    {/* Tooltip on hover */}
                    {(hoveredHotspot === spot.id || selectedHotspot?.id === spot.id) && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-xl whitespace-nowrap animate-fade-in z-30">
                        <div className="text-sm font-semibold text-foreground">{spot.district}</div>
                        <div className="text-xs text-muted-foreground">{spot.city}</div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-card rotate-45" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleReset} className="bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg">
                  <Navigation className="w-4 h-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  onClick={() => setShowHeatmap(!showHeatmap)} 
                  className={`bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg ${showHeatmap ? "ring-2 ring-accent" : ""}`}
                >
                  <Layers className="w-4 h-4" />
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur-sm rounded-xl shadow-lg z-30">
                <div className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  Yatırım Potansiyeli
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs text-muted-foreground">Çok Yüksek (90+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent/70" />
                    <span className="text-xs text-muted-foreground">Yüksek (85-89)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <span className="text-xs text-muted-foreground">İyi (80-84)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold/70" />
                    <span className="text-xs text-muted-foreground">Orta (75-79)</span>
                  </div>
                </div>
              </div>

              {/* Selected Hotspot Detail */}
              {selectedHotspot && (
                <div className="absolute top-4 left-4 max-w-xs p-4 bg-card/95 backdrop-blur-sm rounded-xl shadow-xl z-30 animate-scale-in">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-foreground">{selectedHotspot.district}</h4>
                      <p className="text-sm text-muted-foreground">{selectedHotspot.city}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedHotspot.score >= 90 ? "bg-accent/20 text-accent" : "bg-gold/20 text-gold"
                    }`}>
                      Skor: {selectedHotspot.score}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground">Ort. Fiyat</div>
                      <div className="font-semibold text-foreground">{selectedHotspot.price}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground">Yıllık Artış</div>
                      <div className="font-semibold text-accent">{selectedHotspot.growth}</div>
                    </div>
                  </div>
                  <div className="mt-3 p-2 rounded-lg bg-accent/10">
                    <div className="text-xs text-muted-foreground">m² Birim Fiyatı</div>
                    <div className="font-semibold text-foreground">₺{selectedHotspot.avgPrice.toLocaleString("tr-TR")}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedHotspot(null)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted-foreground hover:text-muted transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </Card>
          </div>

          {/* Hotspots List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Öne Çıkan Bölgeler
            </h3>
            
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
              {hotspots
                .sort((a, b) => b.score - a.score)
                .map((spot) => (
                <Card 
                  key={spot.id}
                  className={`p-4 border-0 shadow-md transition-all duration-300 cursor-pointer
                    ${selectedHotspot?.id === spot.id 
                      ? "ring-2 ring-accent shadow-lg bg-accent/5" 
                      : "hover:shadow-lg hover:-translate-y-1 bg-gradient-card"
                    }`}
                  onClick={() => setSelectedHotspot(spot)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{spot.district}</h4>
                      <p className="text-sm text-muted-foreground">{spot.city}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      spot.score >= 90 ? "bg-accent/20 text-accent" : 
                      spot.score >= 85 ? "bg-accent/15 text-accent" :
                      spot.score >= 80 ? "bg-gold/20 text-gold" : 
                      "bg-muted text-muted-foreground"
                    }`}>
                      {spot.score}/100
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
            </div>

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

export default InteractiveMap;
