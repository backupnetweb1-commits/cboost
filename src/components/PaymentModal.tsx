import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, MessageSquare, Smartphone, Gift, Coins, ExternalLink } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planAmount: number;
}

const PaymentModal = ({ isOpen, onClose, planName, planAmount }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const paymentMethods = [
    {
      id: "paysafe",
      name: "Paysafe Voucher",
      description: "Pay with Paysafe prepaid vouchers",
      icon: <CreditCard className="w-5 h-5" />,
      requiresAdmin: true,
      color: "bg-green-500"
    },
    {
      id: "steam",
      name: "Steam Wallet Code",
      description: "Pay with Steam gift cards",
      icon: <Gift className="w-5 h-5" />,
      requiresAdmin: true,
      color: "bg-blue-500"
    },
    {
      id: "razor",
      name: "Razer Gold",
      description: "Pay with Razer Gold vouchers",
      icon: <Smartphone className="w-5 h-5" />,
      requiresAdmin: true,
      color: "bg-purple-500"
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Pay with Bitcoin, Ethereum, etc.",
      icon: <Coins className="w-5 h-5" />,
      requiresAdmin: false,
      color: "bg-orange-500"
    }
  ];

  const handlePaymentSelect = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return;

    if (method.requiresAdmin) {
      // Redirect to admin contact
      window.open("https://t.me/admin", "_blank");
    } else {
      // Handle crypto payment directly
      setSelectedMethod(methodId);
      // Implement crypto payment logic here
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select your preferred payment method for {planName} - ${planAmount}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${method.color} text-white`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      {method.requiresAdmin && (
                        <Badge variant="outline" className="mt-1">
                          Admin Assistance Required
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePaymentSelect(method.id)}
                    className={method.requiresAdmin ? "bg-blue-500 hover:bg-blue-600" : "bg-gradient-primary"}
                  >
                    {method.requiresAdmin ? (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Admin
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Pay Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Payment Instructions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• For voucher payments, our admin will guide you through the process</li>
            <li>• Cryptocurrency payments are processed automatically</li>
            <li>• Contact admin via Telegram or WhatsApp for payment assistance</li>
            <li>• Keep your payment receipts for verification</li>
          </ul>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;