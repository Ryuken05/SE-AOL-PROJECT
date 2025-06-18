
import { useState } from "react";
import EmergencyButton from "../components/EmergencyButton";
import EmergencyContacts from "../components/EmergencyContacts";
import EmergencyServices from "../components/EmergencyServices";
import { Shield, Phone, MapPin } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("panic");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Safe Call Buddy</h1>
          </div>
          <p className="text-gray-600 mt-1">Your personal emergency response companion</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab("panic")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "panic"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield className="w-5 h-5 mx-auto mb-1" />
            Panic Button
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "contacts"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Phone className="w-5 h-5 mx-auto mb-1" />
            Contacts
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "services"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MapPin className="w-5 h-5 mx-auto mb-1" />
            Emergency Services
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {activeTab === "panic" && <EmergencyButton />}
        {activeTab === "contacts" && <EmergencyContacts />}
        {activeTab === "services" && <EmergencyServices />}
      </div>
    </div>
  );
};

export default Index;
