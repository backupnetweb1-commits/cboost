import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UploadCloud , Delete, Import } from "lucide-react";
import { uploadToCloudinary } from "@/utils";
import { useAuth } from "@/hooks/useAuth";


const proofOptions = [
    { value: "buy_referral", label: "Buy Referral Proof" },
    { value: "deposit_proof", label: "Deposit Proof" },
    { value: "shopping_proof", label: "Shopping Proof" }
];

const Uploard: React.FC = () => {
    const [selectedProof, setSelectedProof] = useState(proofOptions[0].value);
    const [referral, setReferral] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { user, loading } = useAuth();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleUploadtoCloudinary = async () => {
        try {
            const result = await uploadToCloudinary([image], "dzfqiaf3v", "crypto-boost");
            return result[0];
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUploadtoCloudinary().then(url => {
            console.log(url)
        });
        // Handle upload logic here
        alert("Upload submitted!\nReferral: " + referral + "\nType: " + selectedProof + (image ? "\nImage selected." : "\nNo image."));
    };
    React.useEffect(() => {
        if (user && user.referralCode) {
            setReferral(user.referralCode || "");
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background  ">
                <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>Upload Proof</CardTitle>
                        <CardDescription>Submit your proof of referral, deposit, or shopping by uploading an image and filling the form below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="referral">Referral</Label>
                                <Input
                                    id="referral"
                                    placeholder="Enter referral code or name"
                                    value={referral}
                                    onChange={e => setReferral(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="proof-type">Proof Type</Label>
                                <Select value={selectedProof} onValueChange={setSelectedProof}>
                                    <SelectTrigger id="proof-type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {proofOptions.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        


                            <div>
                                <Label htmlFor="image">Upload Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
                                {!preview ? (
                                    <div className="flex flex-col items-center justify-center mt-4 p-6 border-2 border-dashed border-accent rounded-lg bg-muted/30">
                                        <UploadCloud className="w-12 h-12 text-accent mb-2" />
                                        <span className="text-muted-foreground text-sm">
                                            Click or drag an image file to upload your proof
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex justify-center mt-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="rounded-lg border-2 border-accent shadow-lg max-h-64 max-w-full object-contain bg-white"
                                        />
                                    </div>
                                )}
                                {image && (<Button  variant="destructive"  onClick={() => {
                                    setPreview(null);
                                    setImage(null)}} className="mt-2"> <Delete className="w-6 h-6 mr-2" /> Remove Image</Button>)}
                            </div>
                            <Button type="submit" className="w-full bg-gradient-primary mt-2">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default Uploard;
