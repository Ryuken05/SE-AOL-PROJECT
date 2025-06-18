
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { getLocation } from "../utils/locationService";

const EmergencyButton = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isActivated) {
      handleEmergencyActivation();
    }
  }, [countdown, isActivated]);

  const handlePanicPress = async () => {
    if (!isActivated) {
      setIsActivated(true);
      setCountdown(5);
      toast.warning("Emergency alert will be sent in 5 seconds. Press Cancel to stop.");
      
      // Get location
      try {
        const loc = await getLocation();
        setLocation(loc);
      } catch (error) {
        console.error("Could not get location:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsActivated(false);
    setCountdown(0);
    toast.info("Emergency alert cancelled.");
  };

  const handleEmergencyActivation = () => {
    // Simulate emergency response
    toast.success("Emergency contacts have been notified!");
    toast.info("Location shared with emergency contacts");
    
    // Reset after activation
    setTimeout(() => {
      setIsActivated(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Main Panic Button */}
      <Card className="p-8 text-center bg-white shadow-lg">
        <div className="space-y-6">
          {!isActivated ? (
            <>
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Panic Button</h2>
                <p className="text-gray-600">
                  Press and hold in case of emergency. Your emergency contacts will be notified automatically.
                </p>
              </div>
              <Button
                onClick={handlePanicPress}
                className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                  <div>PANIC</div>
                  <div className="text-sm font-normal">Press for Help</div>
                </div>
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-orange-900 mb-2">Emergency Alert Activating</h2>
                <p className="text-lg font-medium text-orange-700">
                  Sending alert in {countdown} seconds...
                </p>
                {location && (
                  <p className="text-sm text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location: {location}
                  </p>
                )}
              </div>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="px-8 py-3 text-lg border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Cancel Alert
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Call 911</h3>
          </div>
          <p className="text-gray-600 mb-4">Direct line to emergency services</p>
          <Button
            onClick={() => {
              window.location.href = "tel:911";
              toast.info("Calling 911...");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Call Now
          </Button>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Share Location</h3>
          </div>
          <p className="text-gray-600 mb-4">Send your location to trusted contacts</p>
          <Button
            onClick={async () => {
              try {
                const loc = await getLocation();
                navigator.clipboard.writeText(loc);
                toast.success("Location copied to clipboard!");
              } catch (error) {
                toast.error("Could not get location");
              }
            }}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            Get Location
          </Button>
        </Card>
      </div>

      {/* Safety Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Safety Tips</h3>
        </div>
        <ul className="space-y-2 text-blue-800">
          <li>• Keep your phone charged and easily accessible</li>
          <li>• Update your emergency contacts regularly</li>
          <li>• Share your location with trusted friends/family</li>
          <li>• Practice using this app so you're familiar in emergencies</li>
        </ul>
      </Card>
    </div>
  );
};

export default EmergencyButton;
