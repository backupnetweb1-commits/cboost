import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/useClickOutside"; // + Import the new hook

// UI & Icons
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, TrendingUp, Users, ShoppingCart, MessageCircle, Briefcase, Home, ShoppingBag, User, Settings, LogOut, Wallet, LayoutDashboard } from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";


// --- Data Constants ---
// + Define navigation data outside the component to prevent re-creation on render.
const getNavigationItems = (t) => [
  { name: t("home"), href: "/", icon: Home },
  { name: t("investment"), href: "/investment", icon: TrendingUp, important: true },
  { name: t("feedback"), href: "/feedback", icon: MessageCircle },
  { name: t("employment"), href: "/employment", icon: Briefcase }, // + Use t() for consistency
  { name: t("referring"), href: "/referring", icon: Users },
  { name: t("Referral Market"), href: "/market", icon: ShoppingBag },
  { name: t("shop"), href: "/shop", icon: ShoppingCart },
  { name: t("Take a Loan"), href: "/loans", icon: User },
];

// + Define profile actions here to be reused in desktop and mobile.
const getProfileMenuItems = (t, logOut) => [
  { name: t("myProfile"), href: '/profile', icon: User },
  { name: t("settings"), href: '/settings', icon: Settings },
  { name: t("dashboard"), href: '/user-dashboard', icon: LayoutDashboard },
  { name: t("transactions"), href: '/transaction', icon: Wallet },
  { name: t("logout"), action: logOut, icon: LogOut, isDestructive: true }, // + Handle logout as an action
];

// --- Sub-Components ---

// + Create a reusable component for the profile dropdown.
const ProfileDropdown = ({ user, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // + Use the custom hook to close dropdown on outside click
  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  if (!user) return null; // Don't render if not logged in

  return (
    <div ref={dropdownRef} className="relative hidden lg:flex items-center">
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center justify-center h-10 w-10 rounded-full border-2 border-white focus:outline-none focus:ring-2 focus:ring-primary'>
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 py-1">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="py-1">
            {menuItems.map((item) => (
              item.href ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => { item.action(); setIsOpen(false); }}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm ${item.isDestructive ? 'text-red-500' : 'text-foreground'} hover:bg-muted`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Navigation Component ---

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  // + Get translated items
  const navigationItems = getNavigationItems(t);
  const profileMenuItems = getProfileMenuItems(t, logOut);

  return (
    <nav className="bg-gradient-hero border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img src="/images/logo/cb_logo.png" alt="Logo" className="w-9 h-9" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.href ? ' text-primary underline' : 'text-foreground hover:bg-muted'}`}
              >
                {item.name}
                {item.important && <Badge variant="destructive" className="absolute -top-1 -right-1 p-0.5 h-4 w-4 justify-center text-xs">!</Badge>}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {/* + Use a standard <a> tag for external links */}
            <a href="https://noones.com/?r=Cryptoboost2016" target="_blank" rel="noopener noreferrer">
              <Button>Buy Crypto</Button>
            </a>

            {user ? (
              <ProfileDropdown user={user} menuItems={profileMenuItems} />
            ) : (
              <Link to="/user-dashboard">
                <Button>Login</Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-2 pt-2 pb-3 space-y-1">
          {/* + Add a null check for user */}
          {user && (
            <div className="px-3 py-2 text-center border-b border-border">
              <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            </div>
          )}
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${location.pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          {/* + Reuse profile menu items for mobile */}
          <div className="border-t border-border mt-2 pt-2">
            {profileMenuItems.map((item) => (
               item.href ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-foreground"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => { item.action(); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md font-medium ${item.isDestructive ? 'text-red-500' : 'text-foreground'}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;