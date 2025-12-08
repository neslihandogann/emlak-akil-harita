import { Building2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">EmlakAI</span>
            </div>
            <p className="text-primary-foreground/60 mb-6 max-w-md">
              Türkiye'nin en gelişmiş yapay zeka destekli emlak fiyat tahmin platformu. 
              Derin öğrenme algoritmaları ile veriye dayalı karar alma süreçlerinizi destekliyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {["Fiyat Tahmini", "Yatırım Haritası", "Bölge Analizi", "API Dokümantasyonu"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/60">
                <Mail className="w-4 h-4 text-accent" />
                info@emlakai.com.tr
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/60">
                <Phone className="w-4 h-4 text-accent" />
                +90 (212) 555 0123
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <span>Levent, İstanbul<br />Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2024 EmlakAI. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Kullanım Koşulları
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Çerez Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
