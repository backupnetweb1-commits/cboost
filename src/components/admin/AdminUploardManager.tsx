import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dummy data for demonstration
const uploardData = [
  {
    id: 1,
    referral: "ref123",
    proofType: "buy_referral",
    imageUrl: "/placeholder.svg",
    status: "Pending"
  },
  {
    id: 2,
    referral: "ref456",
    proofType: "deposit_proof",
    imageUrl: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 3,
    referral: "ref789",
    proofType: "shopping_proof",
    imageUrl: "/placeholder.svg",
    status: "Rejected"
  }
];

const proofTypeLabel = {
  buy_referral: "Buy Referral Proof",
  deposit_proof: "Deposit Proof",
  shopping_proof: "Shopping Proof"
};

const AdminUploardManager: React.FC = () => {
  const [data, setData] = useState(uploardData);

  const handleStatusChange = (id: number, newStatus: string) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <Card className="w-full mt-16 bg-gradient-card border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle>Uploard Submissions</CardTitle>
        <CardDescription>Review and update user-uploaded proofs from the Uploard page.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-3 px-2">Image</th>
                <th className="text-left py-3 px-2">Referral</th>
                <th className="text-left py-3 px-2">Proof Type</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id} className="border-b border-border/20 hover:bg-accent/5">
                  <td className="py-3 px-2">
                    <img src={item.imageUrl} alt="Proof" className="w-24 h-16 object-cover rounded border" />
                  </td>
                  <td className="py-3 px-2 font-medium">{item.referral}</td>
                  <td className="py-3 px-2">{proofTypeLabel[item.proofType]}</td>
                  <td className="py-3 px-2">
                    <Badge variant={item.status === "Approved" ? "default" : item.status === "Rejected" ? "destructive" : "outline"}>{item.status}</Badge>
                  </td>
                  <td className="py-3 px-2 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(item.id, "Approved")}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleStatusChange(item.id, "Rejected")}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUploardManager;
