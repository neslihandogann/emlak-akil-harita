import { Card } from "@/components/ui/card";
import { Brain, Database, Server, Layout, CheckCircle, Target, Users, Award } from "lucide-react";

const About = () => {
  const systemLayers = [
    {
      icon: Database,
      title: "Veri Katmanı",
      description: "Ham ve işlenmiş emlak verilerini, model eğitim loglarını ve tahmin isteklerini barındıran PostgreSQL veritabanı.",
      features: ["50.000+ emlak verisi", "Güncel piyasa verileri", "Kaggle Turkey Real Estate Dataset"],
    },
    {
      icon: Server,
      title: "Backend/Model Katmanı",
      description: "Veri işleme motoru, MLP model eğitim modülü ve tahmin API'si. Python tabanlı TensorFlow/Keras altyapısı.",
      features: ["Multi-Layer Perceptron (MLP)", "TensorFlow & Keras", "REST API Servisi"],
    },
    {
      icon: Layout,
      title: "Frontend Katmanı",
      description: "Kullanıcı etkileşiminin gerçekleştiği, form girişlerinin yapıldığı ve sonuçların görselleştirildiği arayüz.",
      features: ["React & TypeScript", "Interaktif Harita", "Gerçek Zamanlı Tahmin"],
    },
  ];

  const modules = [
    {
      title: "Veri Toplama Modülü",
      description: "Web scraping ile büyük emlak sitelerinden periyodik güncel veri toplama",
      focus: "Veri Bütünlüğü",
    },
    {
      title: "Model Eğitimi Modülü",
      description: "Ham veriyi temizleme, One-Hot Encoding, normalizasyon ve MLP model eğitimi",
      focus: "Model Doğruluğu",
    },
    {
      title: "Tahmin Servisi Modülü",
      description: "Eğitilmiş modelin REST API olarak dağıtılması ve anlık fiyat tahmini",
      focus: "API Performansı",
    },
    {
      title: "Görselleştirme Modülü",
      description: "Tahmin sonuçlarının Heatmap olarak gösterilmesi ve yatırım önerileri",
      focus: "Kullanıcı Deneyimi",
    },
  ];

  const stats = [
    { icon: Target, value: "%94", label: "Tahmin Doğruluğu" },
    { icon: Database, value: "50K+", label: "Veri Noktası" },
    { icon: Users, value: "12K+", label: "Aktif Kullanıcı" },
    { icon: Award, value: "81", label: "İl Kapsamı" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Hakkımızda
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Yapay Zeka ile Emlak Analizi
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Bu proje, büyük ölçekli emlak verilerini toplayarak Derin Öğrenme (Multi-Layer Perceptron - MLP) 
            algoritmaları ile analiz eden akıllı bir platform geliştirmeyi amaçlamaktadır.
          </p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-16 border-0 shadow-lg bg-gradient-card">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Projemizin Amacı</h3>
              <p className="text-muted-foreground mb-6">
                Temel işlev, kullanıcının girdiği mülk özelliklerine dayanarak gayrimenkullerin tahmini 
                satış fiyatını yüksek doğrulukla öngörmek ve yatırım potansiyeli yüksek bölgeleri harita 
                üzerinde görselleştirmektir.
              </p>
              <ul className="space-y-3">
                {[
                  "Geleneksel yöntemlere göre daha güvenilir fiyat tahminleri",
                  "Emlak yatırımcılarına veriye dayalı şeffaf karar alma",
                  "Harita tabanlı yatırım potansiyeli görselleştirmesi",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-xl bg-muted/50 text-center">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* System Architecture */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Sistem Mimarisi</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {systemLayers.map((layer, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg bg-gradient-card hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <layer.icon className="w-7 h-7 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{layer.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{layer.description}</p>
                <ul className="space-y-2">
                  {layer.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Modül Analizi</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <Card key={index} className="p-5 border-0 shadow-md bg-gradient-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    {module.focus}
                  </span>
                  <span className="text-xs text-muted-foreground">Modül {index + 1}</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{module.title}</h4>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Features */}
        <Card className="mt-16 p-8 border-0 shadow-lg bg-hero text-primary-foreground">
          <h3 className="text-2xl font-bold mb-6 text-center">Veri Seti Özellikleri</h3>
          <p className="text-primary-foreground/70 text-center mb-8 max-w-2xl mx-auto">
            Kaggle Turkey Real Estate Dataset temel veri setini kullanarak Türkiye emlak piyasasındaki 
            geniş bir coğrafi bölgeden toplanmış mülk özelliklerini analiz ediyoruz.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Fiyat (Price)", type: "Hedef Değişken", desc: "Regresyon" },
              { label: "Şehir, İlçe", type: "Konumsal", desc: "Kategorik" },
              { label: "Metrekare, Oda", type: "Yapısal", desc: "Sayısal" },
              { label: "Bina Yaşı", type: "Zamansal", desc: "Sayısal" },
              { label: "Isıtma, Eşya", type: "Diğer", desc: "Kategorik" },
            ].map((feature, index) => (
              <div key={index} className="p-4 rounded-xl bg-primary-foreground/10 text-center">
                <div className="text-xs text-accent mb-1">{feature.type}</div>
                <div className="font-semibold text-primary-foreground">{feature.label}</div>
                <div className="text-xs text-primary-foreground/60 mt-1">{feature.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
