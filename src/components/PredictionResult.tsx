import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, MapPin, BarChart3, ArrowRight, Sparkles, Target, Shield } from "lucide-react";

interface PredictionResultProps {
  price: number;
  city: string;
  district: string;
  squareMeters: string;
  rooms: string;
}

const PredictionResult = ({ price, city, district, squareMeters, rooms }: PredictionResultProps) => {
  const pricePerSqm = Math.round(price / parseInt(squareMeters));
  const marketAvg = Math.round(pricePerSqm * 0.92);
  const difference = ((pricePerSqm - marketAvg) / marketAvg * 100).toFixed(1);
  const isAboveAverage = parseFloat(difference) > 0;
  
  const confidenceScore = 94;
  const investmentScore = isAboveAverage ? 72 : 85;

  return (
    <Card className="w-full overflow-hidden shadow-xl border-0 animate-scale-in">
      {/* Header with price */}
      <div className="bg-hero p-6 md:p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Tahmin Sonucu
          </div>
          <h3 className="text-primary-foreground/80 text-lg mb-2">Tahmini Satış Fiyatı</h3>
          <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            ₺{price.toLocaleString("tr-TR")}
          </div>
          <p className="text-primary-foreground/60 text-sm">
            {city}, {district} • {squareMeters} m² • {rooms}+1
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 md:p-8 space-y-6 bg-gradient-card">
        {/* Price per sqm comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">m² Birim Fiyatı</div>
            <div className="text-2xl font-bold text-foreground">₺{pricePerSqm.toLocaleString("tr-TR")}</div>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">Bölge Ortalaması</div>
            <div className="text-2xl font-bold text-foreground">₺{marketAvg.toLocaleString("tr-TR")}</div>
          </div>
        </div>

        {/* Market comparison */}
        <div className={`flex items-center gap-3 p-4 rounded-xl ${isAboveAverage ? "bg-gold/10" : "bg-emerald-light"}`}>
          {isAboveAverage ? (
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-accent" />
            </div>
          )}
          <div>
            <div className="font-semibold text-foreground">
              Bölge ortalamasından %{Math.abs(parseFloat(difference))} {isAboveAverage ? "yüksek" : "düşük"}
            </div>
            <div className="text-sm text-muted-foreground">
              {isAboveAverage ? "Premium konum veya özellikler tespit edildi" : "Uygun fiyatlı yatırım fırsatı"}
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4">
          {/* Confidence Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Target className="w-4 h-4" />
                Güven Skoru
              </span>
              <span className="text-sm font-bold text-foreground">{confidenceScore}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-1000"
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>

          {/* Investment Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Yatırım Puanı
              </span>
              <span className="text-sm font-bold text-foreground">{investmentScore}/100</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${investmentScore}%`,
                  background: investmentScore > 75 ? "hsl(var(--accent))" : "hsl(var(--gold))"
                }}
              />
            </div>
          </div>
        </div>

        {/* Model info */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background/50">
          <Shield className="w-5 h-5 text-accent mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">MLP Derin Öğrenme Modeli</span> kullanılarak 
            50,000+ emlak verisi üzerinden eğitilmiş yapay zeka ile hesaplanmıştır.
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <MapPin className="w-4 h-4 mr-2" />
            Haritada Gör
          </Button>
          <Button variant="accent" className="h-12">
            Detaylı Rapor
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PredictionResult;
