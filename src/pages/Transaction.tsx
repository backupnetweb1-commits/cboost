import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, CreditCard, Landmark, Smartphone, User, Bitcoin, Copy, Check, Wallet } from "lucide-react";
import Layout from "@/components/Layout";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { set } from "date-fns";

// Define the structure for a cryptocurrency
interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  walletAddress: string;
  network?: string;
}

const WalletPage = () => {
  // State for user balance (replace with real data)
  const [balance, setBalance] = useState({
    xaf: 150725.50,
    btc: 0.0054,
    eth: 0.12
  });

  const { user } = useAuth();
  const {toast} = useToast();

  useEffect(() => {
    // Simulate fetching user balance
    if(user){
        setTimeout(() => {
      setBalance({
        xaf: user['walletBalance'] ?? 0,
        btc: 0.0054,
        eth: 0.12
      });
    }, 2000);
    }
    
  }, [user]);




  // Existing state
  const [depositAmount, setDepositAmount] = useState("");
  const [depositPhone, setDepositPhone] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  // New state for crypto
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin");
  const [copiedAddress, setCopiedAddress] = useState<string>("");

  const cryptocurrencies: Cryptocurrency[] = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿", walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", network: "Bitcoin Mainnet" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "⧫", walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "Ethereum ERC20" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "◎", walletAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", network: "Solana Mainnet" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", icon: "Ł", walletAddress: "LSN5D48a7R7Vc5d3VtJqqVvJVkFkXhL7qR", network: "Litecoin Mainnet" },
  ];
  
  const selectedCryptoData = cryptocurrencies.find(c => c.id === selectedCrypto);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(""), 2000); // Reset after 2 seconds
  };
  
  const handleDeposit = (method: string) => {
    alert(`Initiating ${method} deposit of ${depositAmount} from ${depositPhone || 'card'}.`);
  };

  const handleWithdraw = () => {
    alert(`Initiating withdrawal of ${withdrawAmount} to ${withdrawAddress}.`);
  };
    useEffect(() => {
        if(withdrawAmount && user['walletBalance'] < withdrawAmount ){
           
                    // toast({
                    //     title: "Error",
                    //     description: "Insufficient balance. You only have "+user['walletBalance']+" XAF in your wallet.",
                    //     duration: 9000,
                    //   });
         //   alert(`Insufficient balance. You only have ${user['walletBalance']} XAF in your wallet.`);
         setWithdrawError('Insufficient balance. You only have ' +user['walletBalance'] +' XAF in your wallet.')
        } else {
            setWithdrawError("");
        }
    
  })
console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrr ',user)
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-primary text-primary-foreground mx-auto px-4 py-2 rounded-full text-sm font-medium mb-4">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Manage Your Funds</span>
              </div>
              <CardTitle className="text-3xl font-bold">Deposit & Withdraw</CardTitle>
              <CardDescription>
                Easily add or remove funds using fiat or crypto.
              </CardDescription>
            </CardHeader>
            <CardContent>

              {/* ACCOUNT BALANCE SECTION */}
              <Card className="mb-8 bg-gradient-subtle border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {balance.xaf.toLocaleString('fr-CM', { style: 'currency', currency: 'XAF' })}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-4 mt-1">
                    <span>{balance.btc.toFixed(4)} BTC</span>
                    <span>{balance.eth.toFixed(4)} ETH</span>
                  </div>
                </CardContent>
              </Card>

              {/* TABS FOR DEPOSIT AND WITHDRAW */}
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                </TabsList>
                
                {/* DEPOSIT TAB */}
                <TabsContent value="deposit">
                  <Card className="bg-transparent border-0 shadow-none mt-4">
                    <CardHeader>
                      <CardTitle>Choose Deposit Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="crypto" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-4">
                          {/* <TabsTrigger value="momo">MoMo</TabsTrigger>
                          <TabsTrigger value="orange">Orange</TabsTrigger>
                          <TabsTrigger value="airtel">Airtel</TabsTrigger>
                          <TabsTrigger value="card">Card</TabsTrigger> */}
                          <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        </TabsList>
                        
                        {/* Mobile Money Content */}
                        {['momo', 'orange', 'airtel'].map(method => (
                          <TabsContent key={method} value={method}>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`${method}-amount`}>Amount (XAF)</Label>
                                <Input id={`${method}-amount`} type="number" placeholder="e.g., 5000" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`${method}-phone`}>Phone Number</Label>
                                <div className="flex items-center space-x-2">
                                   <Smartphone className="h-5 w-5 text-muted-foreground" />
                                   <Input id={`${method}-phone`} type="tel" placeholder="e.g., 670000000" value={depositPhone} onChange={(e) => setDepositPhone(e.target.value)} />
                                </div>
                              </div>
                              <Button onClick={() => handleDeposit(method)} className="w-full bg-gradient-primary">
                                Deposit with {method.charAt(0).toUpperCase() + method.slice(1)}
                              </Button>
                            </div>
                          </TabsContent>
                        ))}

                        {/* Bank Card Content */}
                        <TabsContent value="card">
                           <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-amount">Amount (XAF)</Label>
                                <Input id="card-amount" type="number" placeholder="e.g., 10000" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                              </div>
                               <div className="space-y-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <div className="flex items-center space-x-2">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                  <Input id="card-name" placeholder="John Doe" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                 <div className="flex items-center space-x-2">
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                  <Input id="card-number" placeholder="**** **** **** 1234" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="expiry">Expiry Date</Label><Input id="expiry" placeholder="MM/YY" /></div>
                                <div className="space-y-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div>
                              </div>
                              <Button onClick={() => handleDeposit('Bank Card')} className="w-full bg-gradient-primary">Pay with Card</Button>
                            </div>
                        </TabsContent>

                        {/* Crypto Deposit Content */}
                        <TabsContent value="crypto">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="crypto-select">Select Cryptocurrency</Label>
                              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {cryptocurrencies.map((crypto) => (
                                    <SelectItem key={crypto.id} value={crypto.id}>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-lg">{crypto.icon}</span>
                                        <span>{crypto.name} ({crypto.symbol})</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {selectedCryptoData && (
                              <Card className="bg-gradient-subtle border-border/50 p-4">
                                <div className="flex flex-col items-center space-y-4">
                                  <p className="text-sm text-center text-muted-foreground">
                                    Send only <span className="font-bold text-foreground">{selectedCryptoData.symbol}</span> to this address on the <span className="font-bold text-foreground">{selectedCryptoData.network}</span>.
                                  </p>
                                  <div className="p-2 bg-white rounded-lg border">
                                    <QRCodeSVG value={selectedCryptoData.walletAddress} size={160} />
                                  </div>
                                  <div className="w-full">
                                    <Label className="text-sm text-muted-foreground mb-2">
                                      {selectedCryptoData.name} Deposit Address
                                    </Label>
                                    
                                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                                      <span className="text-sm font-mono truncate">{selectedCryptoData.walletAddress}</span>
                                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selectedCryptoData.walletAddress)} className="h-8 w-8">
                                        {copiedAddress === selectedCryptoData.walletAddress ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                    {/* uploard screenshot of successful transaction */}
                                    <Input type="file" className="" accept="image/*" onChange={(e) => console.log(e.target.files)} />
                                  </div>
                                </div>
                              </Card>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* WITHDRAW TAB */}
                <TabsContent value="withdraw">
                   <Card className="bg-transparent border-0 shadow-none mt-4">
                     <CardHeader>
                      <CardTitle>Withdraw Funds</CardTitle>
                      <CardDescription>Enter the amount and destination for your withdrawal.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
                        <Input id="withdraw-amount" type="number" placeholder="e.g., 25000" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                        {
                            withdrawError && <p className="text-xs text-red-500">{withdrawError}</p>
                        }
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="account-name">Recipient Name / Description</Label>
                         <div className="flex items-center space-x-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <Input id="account-name" placeholder="e.g., John Doe or 'My Savings'" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-address">Destination Address</Label>
                        <div className="flex items-center space-x-2">
                           <Bitcoin className="h-5 w-5 text-muted-foreground" />
                           <Input id="withdraw-address" placeholder="Enter Crypto, Mobile Money, or Bank account" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} />
                        </div>
                         <p className="text-xs text-muted-foreground pt-1">Please double-check the address. Transactions are irreversible.</p>
                      </div>
                      <Button onClick={handleWithdraw} className="w-full bg-gradient-primary">
                        Confirm Withdrawal
                      </Button>
                    </CardContent>
                   </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;