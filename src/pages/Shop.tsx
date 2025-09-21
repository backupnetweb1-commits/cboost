import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Cpu, Zap, Shield, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { useShop } from "@/hooks/useShop";

interface MiningMachine {
  id: number;
  name: string;
  price: number;
  hashRate: string;
  powerConsumption: string;
  efficiency: string;
  roi: string;
  inStock: boolean;
  image: string;
}

const Shop = () => {
  const { t } = useTranslation();
  const { products, isLoading, error } = useShop();

   if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your equipment...</p>
          </div>
        </div>
      </Layout>
    );
  }
  const machines: MiningMachine[] = products || [
    {
      id: 1,
      name: "AntMiner S19 Pro",
      price: 2499,
      hashRate: "110 TH/s",
      powerConsumption: "3250W",
      efficiency: "29.5 J/TH",
      roi: "12-18 months",
      inStock: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "WhatsMiner M30S++",
      price: 1899,
      hashRate: "112 TH/s",
      powerConsumption: "3472W",
      efficiency: "31 J/TH",
      roi: "14-20 months",
      inStock: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "AntMiner S19j Pro",
      price: 2299,
      hashRate: "100 TH/s",
      powerConsumption: "3068W",
      efficiency: "30.7 J/TH",
      roi: "13-19 months",
      inStock: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "AvalonMiner 1246",
      price: 1699,
      hashRate: "90 TH/s",
      powerConsumption: "3420W",
      efficiency: "38 J/TH",
      roi: "15-22 months",
      inStock: true,
      image: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShoppingCart className="w-4 h-4" />
              <span>Mining Equipment Store</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Professional Mining Hardware
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get the latest and most efficient cryptocurrency mining machines. 
              All equipment comes with warranty and technical support.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Models Available</p>
                    <p className="text-lg font-bold text-foreground">25+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Warranty</p>
                    <p className="text-lg font-bold text-foreground">1-2 Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Max Hash Rate</p>
                    <p className="text-lg font-bold text-foreground">112 TH/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-crypto-blue" />
                  <div>
                    <p className="text-sm text-muted-foreground">Free Shipping</p>
                    <p className="text-lg font-bold text-foreground">Worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mining Machines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <Card key={machine.id} className="relative overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{machine.name}</CardTitle>
                    <Badge variant={machine.inStock ? "default" : "secondary"}>
                      {machine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center">
                    <Cpu className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    ${machine.price.toLocaleString()}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Specifications */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Hash Rate</span>
                      <span className="font-semibold text-foreground">{machine.hashRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Power</span>
                      <span className="font-semibold text-foreground">{machine.powerConsumption}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <span className="font-semibold text-foreground">{machine.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ROI Period</span>
                      <span className="font-semibold text-accent">{machine.roi}</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                    disabled={!machine.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {machine.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>

                  {/* Features */}
                  <div className="pt-4 border-t border-border/30">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-muted-foreground">Free worldwide shipping</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-muted-foreground">24/7 technical support</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-muted-foreground">Setup assistance included</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-crypto border-border/50 shadow-premium">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Need Help Choosing the Right Miner?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our experts can help you select the perfect mining hardware based on your 
                  budget, electricity costs, and expected returns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <Shield className="w-4 h-4 mr-2" />
                    Get Expert Advice
                  </Button>
                  <Button size="lg" variant="outline">
                    View All Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;