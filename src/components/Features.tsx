import { Card } from "@/components/ui/card";
import { Brain, Database, BarChart3, Map, Zap, Shield, RefreshCw, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Derin Öğrenme (MLP)",
    description: "Çok Katmanlı Algılayıcı modeli ile yüksek doğrulukta fiyat tahminleri",
    highlight: true,
  },
  {
    icon: Database,
    title: "50.000+ Veri Noktası",
    description: "Türkiye genelinden toplanan kapsamlı emlak veri seti",
  },
  {
    icon: BarChart3,
    title: "Gerçek Zamanlı Analiz",
    description: "Anlık piyasa verilerine dayalı dinamik fiyat hesaplamaları",
  },
  {
    icon: Map,
    title: "Harita Görselleştirme",
    description: "Yatırım potansiyeli yüksek bölgelerin harita üzerinde gösterimi",
  },
  {
    icon: Target,
    title: "%94 Doğruluk Oranı",
    description: "RMSE ve MAE metrikleriyle doğrulanmış tahmin performansı",
  },
  {
    icon: Zap,
    title: "Hızlı Tahmin",
    description: "Milisaniyeler içinde sonuç üreten optimize edilmiş API",
  },
  {
    icon: RefreshCw,
    title: "Sürekli Güncelleme",
    description: "Periyodik veri toplama ile güncel piyasa trendlerini yansıtma",
  },
  {
    icon: Shield,
    title: "Güvenilir Kaynak",
    description: "Kaggle Turkey Real Estate Dataset temel alınarak geliştirilen sistem",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Platform Özellikleri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Neden EmlaK AI?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Geleneksel değerleme yöntemlerinden farklı olarak, yapay zeka destekli 
            analizlerle daha güvenilir ve hızlı sonuçlar elde edin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${
                feature.highlight ? "bg-hero text-primary-foreground" : "bg-gradient-card"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                feature.highlight 
                  ? "bg-accent/20" 
                  : "bg-accent/10"
              }`}>
                <feature.icon className={`w-6 h-6 ${feature.highlight ? "text-accent" : "text-accent"}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${feature.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${feature.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
