import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bitcoin, TrendingUp, CreditCard, Wallet, ArrowUpDown, DollarSign, Copy, Check } from "lucide-react";
import Layout from "@/components/Layout";
import {QRCodeSVG} from "qrcode.react";

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
  walletAddress: string;
  network?: string;
}

const BuyCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin");
  const [amount, setAmount] = useState<string>("100");
  const [currency, setCurrency] = useState<string>("USD");
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<string>("");

  const cryptocurrencies: Cryptocurrency[] = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 43250.75, change24h: 2.45, icon: "₿", walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", network: "Bitcoin Mainnet" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 2650.30, change24h: -1.25, icon: "⧫", walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "Ethereum ERC20" },
    { id: "binancecoin", name: "BNB", symbol: "BNB", price: 315.80, change24h: 3.15, icon: "⬢", walletAddress: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2", network: "BNB Beacon Chain" },
    { id: "ripple", name: "XRP", symbol: "XRP", price: 0.52, change24h: 5.67, icon: "◊", walletAddress: "rP4t9k4hVZfTLiJfM7K2ZJzLp1oNE6zYe2", network: "XRP Ledger" },
    { id: "cardano", name: "Cardano", symbol: "ADA", price: 0.48, change24h: -2.13, icon: "₳", walletAddress: "addr1q9ql23j6g9dq2u6jy7q9yhhz0h0hqcyq5qw5qkq", network: "Cardano Mainnet" },
    { id: "solana", name: "Solana", symbol: "SOL", price: 98.45, change24h: 7.89, icon: "◎", walletAddress: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", network: "Solana Mainnet" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", price: 7.25, change24h: 1.45, icon: "●", walletAddress: "1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg", network: "Polkadot Relay Chain" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", price: 15.67, change24h: -0.85, icon: "⬣", walletAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", network: "Ethereum ERC20" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", price: 72.35, change24h: 0.95, icon: "Ł", walletAddress: "LSN5D48a7R7Vc5d3VtJqqVvJVkFkXhL7qR", network: "Litecoin Mainnet" },
    { id: "polygon", name: "Polygon", symbol: "MATIC", price: 0.89, change24h: 4.23, icon: "⬟", walletAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", network: "Polygon Mainnet" },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", price: 36.78, change24h: 2.87, icon: "▲", walletAddress: "X-avax1q9ql23j6g9dq2u6jy7q9yhhz0h0hqcyq5qw5qkq", network: "Avalanche C-Chain" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", price: 0.085, change24h: 6.42, icon: "Ð", walletAddress: "D9c7jo6k6X2kS9FqJ4q4qJ4q4qJ4q4qJ4q", network: "Dogecoin Mainnet" }
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", fee: "3.5%", icon: CreditCard },
    { id: "bank", name: "Bank Transfer", fee: "0.5%", icon: DollarSign },
    { id: "wallet", name: "Crypto Wallet", fee: "1.0%", icon: Wallet }
  ];

  const selectedCryptoData = cryptocurrencies.find(c => c.id === selectedCrypto);
  const cryptoAmount = selectedCryptoData ? (parseFloat(amount || "0") / selectedCryptoData.price) : 0;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQRCodeValue = () => {
    if (!selectedCryptoData) return "";
    
    const { symbol, walletAddress } = selectedCryptoData;
    const amount = cryptoAmount.toFixed(8);
    
    const uriSchemes: Record<string, string> = {
      BTC: `bitcoin:${walletAddress}?amount=${amount}`,
      ETH: `ethereum:${walletAddress}?value=${amount}`,
      BNB: `binance:${walletAddress}?amount=${amount}`,
      XRP: `ripple:${walletAddress}?amount=${amount}`,
      ADA: `cardano:${walletAddress}?amount=${amount}`,
      SOL: `solana:${walletAddress}?amount=${amount}`,
      DOT: `polkadot:${walletAddress}?amount=${amount}`,
      LINK: `ethereum:${walletAddress}?value=${amount}`,
      LTC: `litecoin:${walletAddress}?amount=${amount}`,
      MATIC: `polygon:${walletAddress}?amount=${amount}`,
      AVAX: `avalanche:${walletAddress}?amount=${amount}`,
      DOGE: `dogecoin:${walletAddress}?amount=${amount}`
    };
    
    return uriSchemes[symbol] || walletAddress;
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Bitcoin className="w-4 h-4" />
              <span>Buy Cryptocurrency</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Buy Crypto Instantly
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purchase cryptocurrencies with ease using multiple payment methods. 
              Start building your crypto portfolio today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Buy Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bitcoin className="w-5 h-5" />
                    <span>Buy Cryptocurrency</span>
                  </CardTitle>
                  <CardDescription>
                    Choose your cryptocurrency and payment method
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Spend</Label>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="pr-16"
                        />
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger className="absolute right-1 top-1 w-14 h-8 border-0 bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Crypto Selection */}
                  <div className="space-y-2">
                    <Label>Select Cryptocurrency</Label>
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptocurrencies.map((crypto) => (
                          <SelectItem key={crypto.id} value={crypto.id}>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{crypto.icon}</span>
                              <span>{crypto.name} ({crypto.symbol})</span>
                              <Badge variant={crypto.change24h >= 0 ? "default" : "destructive"} className="ml-auto">
                                {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conversion Display */}
                  {selectedCryptoData && (
                    <div className="bg-gradient-subtle p-4 rounded-lg border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">You will receive</span>
                        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        {cryptoAmount.toFixed(8)} {selectedCryptoData.symbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        1 {selectedCryptoData.symbol} = ${selectedCryptoData.price.toLocaleString()}
                      </div>
                    </div>
                  )}

                  {/* Wallet Address Display */}
                  {selectedCryptoData && (
                    <div className="space-y-4">
                      <Label>Send {selectedCryptoData.symbol} to this address</Label>
                      <Card className="cursor-pointer hover:bg-accent/5 transition-colors border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-4">
                            {/* QR Code */}
                            <div className="p-2 bg-white rounded-lg border border-border/30">
                              <QRCodeSVG 
                                value={generateQRCodeValue()} 
                                size={160}
                                level="M"
                                includeMargin
                              />
                            </div>
                            
                            {/* Wallet Address */}
                            <div className="w-full">
                              <Label className="text-sm text-muted-foreground mb-2">
                                {selectedCryptoData.name} Wallet Address
                              </Label>
                              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                                <span className="text-sm font-mono truncate">
                                  {selectedCryptoData.walletAddress}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => copyToClipboard(selectedCryptoData.walletAddress)}
                                  className="h-8 w-8"
                                >
                                  {copied && copiedAddress === selectedCryptoData.walletAddress ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground text-center">
                              Send exactly {cryptoAmount.toFixed(8)} {selectedCryptoData.symbol} to this address. 
                              Transactions typically take 5-30 minutes to confirm.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Payment Methods */}
                  {/* <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <Card key={method.id} className="cursor-pointer hover:bg-accent/5 transition-colors border border-border/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <method.icon className="w-5 h-5 text-primary" />
                                <span className="font-medium">{method.name}</span>
                              </div>
                              <Badge variant="outline">Fee: {method.fee}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div> */}

                 <a href="/" ><Button className="w-full bg-gradient-primary hover:shadow-glow" size="lg">
                    <Bitcoin className="w-4 h-4 mr-2" />
                    Buy {selectedCryptoData?.symbol || "Crypto"}
                  </Button></a>
                </CardContent>
              </Card>
            </div>

            {/* Market Overview */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card border-border/50 h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Market Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cryptocurrencies.slice(0, 6).map((crypto) => (
                    <div key={crypto.id} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{crypto.icon}</span>
                        <div>
                          <div className="font-medium text-foreground">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground">{crypto.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          ${crypto.price.toLocaleString()}
                        </div>
                        <Badge 
                          variant={crypto.change24h >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Markets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Info */}
          <Card className="bg-gradient-crypto border-border/50 shadow-premium">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Bitcoin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Secure Trading</h3>
                  <p className="text-muted-foreground">
                    Industry-leading security with cold storage and multi-signature wallets
                  </p>
                </div>
                <div>
                  <CreditCard className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Multiple Payment Options</h3>
                  <p className="text-muted-foreground">
                    Buy crypto with credit cards, bank transfers, or existing crypto wallets
                  </p>
                </div>
                <div>
                  <TrendingUp className="w-12 h-12 text-crypto-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Live Market Data</h3>
                  <p className="text-muted-foreground">
                    Real-time prices and charts powered by leading market data providers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BuyCrypto;