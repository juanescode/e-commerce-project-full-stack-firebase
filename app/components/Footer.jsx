import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full gap-3 p-5 bg-blue-100 border-t md:p-10">
      <div className="flex flex-col w-full gap-3 border-b md:flex-row md:justify-between">
        <div className="flex">
          <img className="h-8" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col justify-end flex-1 gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">+57 3206233559</h2>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">
              juanestebanvilladagalego23@gmail.com
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-600">Pereira</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <h3 className="text-xs text-gray-700">
          © 2024 . All rights reserved by Juan Esteban Villada Galego
        </h3>
      </div>
    </footer>
  );
}
