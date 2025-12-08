import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Home, Calendar, Flame, Sofa, Calculator, Sparkles } from "lucide-react";
import PredictionResult from "./PredictionResult";

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", 
  "Gaziantep", "Mersin", "Kayseri", "Eskişehir", "Trabzon", "Samsun"
];

const districts: Record<string, string[]> = {
  "İstanbul": ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar", "Bakırköy", "Maltepe", "Ataşehir", "Beyoğlu", "Sarıyer", "Kartal"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan"],
  "İzmir": ["Konak", "Karşıyaka", "Bornova", "Buca", "Çiğli", "Bayraklı"],
  "Bursa": ["Nilüfer", "Osmangazi", "Yıldırım", "Mudanya"],
  "Antalya": ["Muratpaşa", "Konyaaltı", "Kepez", "Lara", "Alanya"],
};

const heatingTypes = ["Doğalgaz Kombi", "Merkezi Sistem", "Soba", "Klima", "Yerden Isıtma"];
const propertyTypes = ["Daire", "Villa", "Müstakil Ev", "Rezidans", "Dublex", "Triplex"];
const furnitureStatus = ["Eşyalı", "Boş", "Yarı Eşyalı"];

const PredictionForm = () => {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [rooms, setRooms] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furniture, setFurniture] = useState("");
  const [floor, setFloor] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate AI prediction calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction logic based on inputs
    const basePrice = 2500000;
    const sqmMultiplier = parseInt(squareMeters) * 25000;
    const roomMultiplier = parseInt(rooms) * 150000;
    const ageDeduction = parseInt(buildingAge) * 50000;
    const cityMultiplier = city === "İstanbul" ? 1.8 : city === "Ankara" ? 1.3 : city === "İzmir" ? 1.4 : 1;
    
    const price = Math.round((basePrice + sqmMultiplier + roomMultiplier - ageDeduction) * cityMultiplier);
    
    setPredictedPrice(price);
    setIsCalculating(false);
    setShowResult(true);
  };

  const availableDistricts = city ? districts[city] || [] : [];

  return (
    <section id="prediction-form" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Tahmin Modülü
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mülk Bilgilerini Girin
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yapay zeka modelimiz, girdiğiniz mülk özelliklerini analiz ederek 
            güncel piyasa koşullarına göre tahmini satış fiyatını hesaplar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Card */}
          <Card className="p-6 md:p-8 bg-card shadow-lg border-0 bg-gradient-card">
            <form onSubmit={handlePredict} className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <MapPin className="w-5 h-5 text-accent" />
                  Konum Bilgileri
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Şehir</Label>
                    <Select value={city} onValueChange={(value) => { setCity(value); setDistrict(""); }}>
                      <SelectTrigger id="city" className="h-12">
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">İlçe</Label>
                    <Select value={district} onValueChange={setDistrict} disabled={!city}>
                      <SelectTrigger id="district" className="h-12">
                        <SelectValue placeholder="İlçe seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDistricts.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Property Details Section */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Building2 className="w-5 h-5 text-accent" />
                  Mülk Özellikleri
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sqm">Metrekare (m²)</Label>
                    <Input
                      id="sqm"
                      type="number"
                      placeholder="120"
                      value={squareMeters}
                      onChange={(e) => setSquareMeters(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Oda Sayısı</Label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger id="rooms" className="h-12">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {["1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "5+2"].map((r) => (
                          <SelectItem key={r} value={r.split("+")[0]}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Bina Yaşı</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="5"
                      value={buildingAge}
                      onChange={(e) => setBuildingAge(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Bulunduğu Kat</Label>
                    <Input
                      id="floor"
                      type="number"
                      placeholder="3"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Features Section */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Home className="w-5 h-5 text-accent" />
                  Ek Özellikler
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Mülk Tipi</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger id="propertyType" className="h-12">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heating">Isıtma Tipi</Label>
                    <Select value={heatingType} onValueChange={setHeatingType}>
                      <SelectTrigger id="heating" className="h-12">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {heatingTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="furniture">Eşya Durumu</Label>
                    <Select value={furniture} onValueChange={setFurniture}>
                      <SelectTrigger id="furniture" className="h-12">
                        <SelectValue placeholder="Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {furnitureStatus.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="accent" 
                size="xl" 
                className="w-full"
                disabled={isCalculating || !city || !squareMeters || !rooms || !buildingAge}
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    AI Hesaplıyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Fiyat Tahmini Yap
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Result Card */}
          <div className="flex items-center justify-center">
            {showResult ? (
              <PredictionResult 
                price={predictedPrice}
                city={city}
                district={district}
                squareMeters={squareMeters}
                rooms={rooms}
              />
            ) : (
              <div className="w-full h-full min-h-[400px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Calculator className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Tahmin Sonucu Burada Görünecek
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Mülk özelliklerini girdikten sonra yapay zeka modelimizin 
                  hesapladığı tahmini fiyat burada gösterilecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
