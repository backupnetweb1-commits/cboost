import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthenticationDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [referredBy, setReferredBy] = useState( "");

  const { loading, error, user, signIn, register } = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signIn(email, password);
        console.log("User logged in successfully!");
      } else {
        const userProfile = {
          firstName,
          lastName,
          username,
          referredBy,
        };
        await register(email, password, userProfile);
        console.log("New user registered successfully!");
      }
    } catch (err: any) {
      console.error("Authentication Error:", err.message);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      onOpenChange(false); // close dialog
    //  navigate("/", { replace: true });
    }
  }, [user, loading, navigate, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? t("welcome_back") : t("start_trading_crypto")}
          </DialogTitle>
          <DialogDescription>
            {isLogin ? t("login_description") : t("signup_description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <CardContent className="grid gap-4 p-0">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">{t("first_name")}</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">{t("last_name")}</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">{t("username")}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

               
                  <div className="grid gap-2">
                    <Label htmlFor="referral">Referred By (Optional)</Label>
                    <Input
                      id="referral"
                      type="text"
                      placeholder="Referral link or code"
                      value={referredBy}
                      onChange={(e) => setReferredBy(e.target.value)}
                    />
                  </div>
              
              </>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </CardContent>

          <DialogFooter className="flex flex-col">
            <Button variant="outline" onClick={()=>{
                navigate('/')
            }}>Cancel</Button>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? t("loading")
                : isLogin
                ? t("login")
                : t("create_account")}
            </Button>

            {/* <Separator className="my-3" /> */}

            <Button
              variant="link"
              className="text-sm"
              onClick={() => setIsLogin(!isLogin)}
              type="button"
            >
              {isLogin ? t("new_to_platform") : t("already_have_account")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationDialog;
