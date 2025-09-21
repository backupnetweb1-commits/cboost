import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign } from "lucide-react";

interface PaymentNotification {
  id: string;
  user: string;
  amount: number;
  currency: string;
  plan: string;
}

const PaymentPopup = () => {
  const [currentNotification, setCurrentNotification] = useState<PaymentNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sample payment notifications
  const notifications: PaymentNotification[] = [
    { id: "1", user: "John D.", amount: 150, currency: "USD", plan: "Plan 2" },
    { id: "2", user: "Sarah M.", amount: 1250, currency: "USD", plan: "Plan 4" },
    { id: "3", user: "Michael R.", amount: 75, currency: "USD", plan: "Plan 1" },
    { id: "4", user: "Emma L.", amount: 750, currency: "USD", plan: "Plan 3" },
    { id: "5", user: "David K.", amount: 2500, currency: "USD", plan: "Plan 5" },
    { id: "6", user: "Lisa W.", amount: 500, currency: "USD", plan: "Plan 3" },
    { id: "7", user: "James B.", amount: 5000, currency: "USD", plan: "Plan 6" },
    { id: "8", user: "Anna C.", amount: 125, currency: "USD", plan: "Plan 2" },
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000);

    // Then show every 30 seconds
    const interval = setInterval(showNotification, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-left duration-500">
      <div className="bg-gradient-card border border-border/50 rounded-lg p-4 shadow-premium backdrop-blur-sm max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/20 rounded-full">
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-foreground">{currentNotification.user}</span>
              <Badge variant="outline" className="text-xs">
                {currentNotification.plan}
              </Badge>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <DollarSign className="w-3 h-3" />
              <span>Received ${currentNotification.amount} {currentNotification.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;