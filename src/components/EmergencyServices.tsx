
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Heart, Flame, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const EmergencyServices = () => {
  const emergencyNumbers = [
    {
      name: "Emergency (911)",
      number: "911",
      description: "Police, Fire, Medical emergencies",
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700"
    },
    {
      name: "Police",
      number: "911",
      description: "Law enforcement assistance",
      icon: Shield,
      color: "blue",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      name: "Fire Department",
      number: "911",
      description: "Fire emergencies and rescue",
      icon: Flame,
      color: "orange",
      bgColor: "bg-orange-600",
      hoverColor: "hover:bg-orange-700"
    },
    {
      name: "Medical Emergency",
      number: "911",
      description: "Ambulance and medical help",
      icon: Heart,
      color: "green",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    }
  ];

  const supportNumbers = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME for crisis support",
      available: "24/7",
      isText: true
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Support for domestic violence situations",
      available: "24/7"
    },
    {
      name: "Poison Control",
      number: "1-800-222-1222",
      description: "Poisoning emergencies and information",
      available: "24/7"
    }
  ];

  const handleCall = (number: string, name: string, isText?: boolean) => {
    if (isText) {
      toast.info(`Text "HOME" to ${number} for crisis support`);
    } else {
      window.location.href = `tel:${number}`;
      toast.info(`Calling ${name}...`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Emergency Services</h2>
        </div>
        <p className="text-gray-600">Quick access to emergency and support services</p>
      </Card>

      {/* Primary Emergency Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {emergencyNumbers.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.name} className="p-6 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${service.bgColor.replace('bg-', 'bg-')}-100 rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-${service.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <Button
                      onClick={() => handleCall(service.number, service.name)}
                      className={`${service.bgColor} ${service.hoverColor} text-white`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {service.number}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Support & Crisis Lines */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Crisis Lines</h3>
        <div className="space-y-4">
          {supportNumbers.map((service) => (
            <Card key={service.name} className="p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {service.available}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <p className="text-lg font-medium text-gray-900">{service.number}</p>
                </div>
                <Button
                  onClick={() => handleCall(service.number, service.name, service.isText)}
                  variant="outline"
                  className="ml-4"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {service.isText ? "Text" : "Call"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Location Services */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-6 h-6 text-yellow-600" />
          <h3 className="font-semibold text-yellow-900">Location Tips</h3>
        </div>
        <div className="text-yellow-800 space-y-2">
          <p><strong>When calling 911:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Stay calm and speak clearly</li>
            <li>Provide your exact location if possible</li>
            <li>Describe the nature of the emergency</li>
            <li>Follow the dispatcher's instructions</li>
            <li>Don't hang up until told to do so</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default EmergencyServices;
