import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Copy, QrCode, Plus, Minus, ArrowUpRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data (replace with API calls)
const btcAddresses = [
    { address: "bc1q8jgnc6j3c3s9772su8vhjtp2euaxzeh3dk06h3", price: 0.01 },
    { address: "bc1q633p7fx6yzju484atfp9yey5tjg9vw7elr4qpq", price: 0.015 },
    { address: "bc1qn5hsgtsyw94lh5k099kpyly3p4zyg3mq04hjkh", price: 0.02 },
    { address: "bc1qtjwe2f7stc9rssgwhdq0xr75vkfrajpxjuun8x", price: 0.02 },
    { address: "bc1qnwkzed2a8m4yxcm20ayjzjtckz567sfdlps4g4", price: 0.025 },
    { address: "bc1qhr3934u45xp2mpm9y3ynapmsxxuh2vpedeh8xs", price: 0.03 },
    { address: "bc1qshg3790kvke7yty4np9kd9xss3557m42xs0syf", price: 0.03 },
    { address: "bc1qmfzxljwy03facq72lrwhxseu8wuxmecsyrs2d5", price: 0.04 },
    { address: "bc1q2mjrlcu3fzgx5flj6uhrjsgj3kvxr3efax7c8v", price: 0.04 },
    { address: "bc1qgtmg5prk5je3dcf7keyyqwdms9qhlsa5dq99uq", price: 0.05 },
    { address: "bc1qlwfwd53gy40wtvf25gujg56fwpjlsgdx5laj9n", price: 0.05 },
    { address: "bc1qzneawlkmd496q973mmy5hshxyanfw0pflcds6t", price: 0.06 },
    { address: "bc1qvy7xqq92d2f38x74jr3v7v535wtxcvtl3689vz", price: 0.06 },
    { address: "bc1q5tk704hu9jm3wlnhz80986qnjhh25p6ljkjq09", price: 0.07 },
    { address: "bc1q5puqcf2wrfafx56qyemf48lfc5j8junmx8a3mc", price: 0.08 },
];

const mockPastSales = [
    {
        address: "bc1qmfzxljwy03facq72lrwhxseu8wuxmecsyrs2d5",
        price: 0.04,
        date: "2 minutes ago",
        claimedBy: "user_a1b2", // New: User ID
        userName: "CryptoKanye" // New: User's Display Name
    },
    {
        address: "bc1qshg3790kvke7yty4np9kd9xss3557m42xs0syf",
        price: 0.03,
        date: "15 minutes ago",
        claimedBy: "user_c3d4",
        userName: "BitcoinBabe"
    },
    {
        address: "bc1qhr3934u45xp2mpm9y3ynapmsxxuh2vpedeh8xs",
        price: 0.03,
        date: "1 hour ago",
        claimedBy: "user_e5f6",
        userName: "Satoshi_Nakamoto"
    },
    {
        address: "bc1qnwkzed2a8m4yxcm20ayjzjtckz567sfdlps4g4",
        price: 0.025,
        date: "3 hours ago",
        claimedBy: "user_g7h8",
        userName: "NFT_Guru"
    },
];

// Helper function to format USD
const formatUSD = (amount: number | undefined) => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Component for Past Sales Table
const PastSalesTable: React.FC<{ sales: typeof mockPastSales; btcPriceUsd: number | null }> = ({ sales, btcPriceUsd }) => {
    return (
        <Card className="w-full bg-gradient-card border-border/50 shadow-lg mt-8 lg:mt-0">
            <CardHeader>
                <CardTitle className="text-2xl">Recent Sales</CardTitle>
                <CardDescription>
                    See the latest referral addresses purchased by other users.
                </CardDescription>
            </CardHeader>
            <CardContent>

                {sales.length === 0 ? (
                    <p className="text-center text-muted-foreground">No recent sales to display.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/2">User</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sales.map((sale, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono text-xs truncate max-w-[150px] md:max-w-none">
                                            {sale.userName}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-semibold">{sale.price} BTC</span>
                                                {btcPriceUsd && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatUSD(sale.price * btcPriceUsd)}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-xs text-muted-foreground">
                                            {sale.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const ReferralMarket: React.FC = () => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<null | { address: string; price: number }>(null);
    const [btcPriceUsd, setBtcPriceUsd] = useState<number | null>(null);
    const { toast } = useToast();
    const [numberOfReferrals, setNumberOfReferrals] = useState(1);
    const {user} = useAuth();
    

    useEffect(() => {
        // Simulate fetching the current BTC price
        const fetchBtcPrice = () => {
            setTimeout(() => {
                setBtcPriceUsd(70000 + Math.random() * 5000 - 2500); // Mock price around $70,000
            }, 500);
        };
        fetchBtcPrice();
        // Refresh price every 60 seconds
        const interval = setInterval(fetchBtcPrice, 60000);
        return () => clearInterval(interval);
    }, []);

    const filtered = btcAddresses.filter((a) =>
        a.address.toLowerCase().includes(search.toLowerCase())
    );

    const handleCopy = (address: string) => {
        navigator.clipboard.writeText(address);
        toast({
            title: "Address copied!",
            description: "You can now paste the address to a wallet or share it.",
        });
    };

    const usdPriceDisplay = (priceBtc: number) => {
        if (!btcPriceUsd) return "Calculating...";
        return formatUSD(priceBtc * btcPriceUsd);
    };

    return (
        <Layout>
            <div className="min-h-screen py-12 px-4 flex flex-col items-center bg-background from-blue-50 to-white">
                <div className="max-w-4xl w-full text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">Referral Market</h1>
                    <p className="text-lg text-muted-foreground mb-6">
                        Buy, sell, or manage referral slots securely. Copy BTC referral
                        addresses or view QR codes instantly.
                    </p>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            placeholder="Search address..."
                            className="px-4 py-2 border border-primary bg-background rounded w-full max-w-sm focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Showing {filtered.length} of {btcAddresses.length} available addresses.
                    </p>
                    <p className="text-sm font-semibold mt-2 text-green-600">
                        BTC Price: {btcPriceUsd ? formatUSD(btcPriceUsd) : <Skeleton className="w-20 h-4 inline-block align-middle" />}
                    </p>
                </div>

                <div className="flex max-lg:flex-col lg:flex-row gap-8 w-full max-w-5xl">
                    {/* Main Referral Addresses Card */}
                    <Card className="w-full bg-gradient-card border-border/50 shadow-lg flex-1 lg:max-h-[500px] overflow-y-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl">Available Addresses</CardTitle>
                            <CardDescription>
                                Click copy or QR to use these addresses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                {filtered.map((item) => (
                                    <div
                                        key={item.address}
                                        className="flex items-center justify-between bg-muted rounded px-3 py-3 hover:bg-primary/10 transition-colors"
                                    >
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-mono text-xs block truncate">{item.address}</span>
                                            <span className="text-sm text-muted-foreground mt-1">
                                                {item.price} BTC ({usdPriceDisplay(item.price)})
                                            </span>
                                        </div>
                                        <div className="flex gap-1 items-center ml-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleCopy(item.address)}
                                                title="Copy Address"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="icon"
                                                onClick={() => setSelected(item)}
                                                title="Show QR Code"
                                                className="w-full text-white"
                                            >
                                                Buy Now
                                                <QrCode className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Past Sales Card */}
                    <div className="w-full lg:w-1/2">
                        <PastSalesTable sales={mockPastSales} btcPriceUsd={btcPriceUsd} />
                    </div>
                </div>

                {/* QR code dialog */}
                <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>QR Code</DialogTitle>
                            <DialogDescription>
                                Scan the QR code to buy the referral. Send succesful transactions screenshots to <Button variant="link" size="sm" className="text-blue-500" onClick={() => window.open(`https://t.me/Cryptoboost2016?text=User Referral Code: ${user['referralCode']}`, "_blank")}>https://t.me/Cryptoboost2016</Button> for a custom referral link.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full flex justify-center gap-2">
                            <Plus className="w-6 h-6 text-green-600" onClick={() => setNumberOfReferrals(numberOfReferrals + 1)} />
                            <span className="text-sm text-muted-foreground mt-1"># of referrals: {numberOfReferrals}</span>
                            <Minus className="w-6 h-6 text-red-600" onClick={() => setNumberOfReferrals(numberOfReferrals - 1)} />
                        </div>
                        {selected && (
                            <div className="flex flex-col items-center p-4">
                                <div className="p-2 border rounded-lg mb-4">
                                    <QRCodeSVG value={selected.address} size={200} />
                                </div>
                                <p className="mt-2 text-xs font-mono break-all text-center">
                                    {selected.address}
                                    <Button variant="ghost" size="icon" onClick={() => handleCopy(selected.address)} title="Copy Address" className="ml-2"><Copy className="w-4 h-4" /></Button>
                                </p>
                                <div className="flex justify-start items-start gap-2">

                                    <p className="text-sm text-muted-foreground font-bold">Send:</p>

                                    <div className="flex flex-col items-center mt-2">
                                        <span className="text-lg font-bold">{selected.price * numberOfReferrals} BTC</span>
                                        <span className="text-sm text-muted-foreground">
                                            {usdPriceDisplay(selected.price * numberOfReferrals)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
};

export default ReferralMarket;