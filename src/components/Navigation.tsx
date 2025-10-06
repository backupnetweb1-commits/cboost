// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Menu, X, TrendingUp, Users, ShoppingCart, MessageCircle, FileText, Home, ShoppingBag, Briefcase, Gift, User, Settings, LogOut, Wallet } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import LanguageSwitcher from "../components/LanguageSwitcher";
// import { useTranslation } from "react-i18next";
// import AddAccount from "./ui/add_acout";


// const Navigation = () => {
//   const [isAddAcount, setIsAddAcount] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const location = useLocation();
//   const { user, logOut } = useAuth();
//   const { t } = useTranslation();
//   const navigationItems = [
//     { name: t("home"), href: "/", icon: Home, important: false, target: "_self" },
//     { name: t("investment"), href: "/investment", icon: TrendingUp, important: true, target: "_self" },
//     { name: t("feedback"), href: "/feedback", icon: MessageCircle, important: false, target: "_self" },
//     { name: "Employment", href: "/employment", icon: Briefcase, important: false },
//     { name: t("referring"), href: "/referring", icon: Users, target: "_self" },
//     { name: t("Referral Market"), href: "/market", icon: ShoppingBag, target: "_self" },
//     { name: t("shop"), href: "/shop", icon: ShoppingCart, target: "_self" },
//     { name: t("Take a Loan"), href: "/loans", icon: User, target: "_self" },
//   ];
//   const handleRedirect = () => {
//     // Redirect the user to an external website
//     window.location.href = 'https://noones.com/?r=Cryptoboost2016';
//   };

   

//   return (
//     <nav className="bg-gradient-hero border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500  rounded-lg flex items-center justify-center shadow-glow">
//                 <img src="/images/logo/logo.png" alt="Logo" className="w-9 h-9" />
//               </div>
//               {/* <span className="text-xl font-bold text-foreground">Mines-Gate</span> */}
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {navigationItems.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} title={item.name} to={item.href} className={`relative flex items-center space-x-2 px-2 rounded transition-smooth ${isActive ? 'bg-green-500' : ''}`} target={item.target}>
//                   {/* <Button
//                     variant={isActive ? "default" : "ghost"}
//                     size="sm"
//                     className="relative flex items-center space-x-2 transition-smooth"
//                   > */}
//                   {/* <item.icon className="w-4 h-4" /> */}
//                   <span>{item.name}</span>
//                   {item.important && (
//                     <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 text-xs">
//                       !
//                     </Badge>
//                   )}
//                   {/* </Button> */}
//                 </Link>
//               );
//             })}
//           </div>
//           <LanguageSwitcher />
//           <Link to={`/user-dashboard`}>
//             <Button>{user ? 'Dashboard' : 'Login'}</Button>
//           </Link>
//           <Button onClick={handleRedirect}>Buy Crypto</Button>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </Button>
//           </div>
//           <div className='relative max-lg:hidden flex items-center justify-center space-x-2 border-2 border-white h-10 w-10 rounded-full'>
//             <User onClick={() => setShowProfile(!showProfile)} className="cursor-pointer text-[11px]" />
//             {showProfile && (<div className="absolute -top-[-100%] -right-1 px-1 min-w-[150px] text-xs rounded-sm bg-background text-primary-foreground flex flex-col gap-2 shadow-glow">
//               <Link to={'/profile'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><User />My Profile</Link>
//               <Link to={'/settings'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><Settings /> {'Settings'}</Link>
//               <div className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4" onClick={logOut}><LogOut className="text-red-500" /> {'Logout'}</div>
//               <Link to={'/transaction'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><Wallet /> {'Transactions(Withdraw/Deposite)'}</Link>


//             </div>)}
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 mb-4 shadow-card">
//               <p>{user["firstName"]} {user['lastName']}</p>
//               {navigationItems.map((item) => {
//                 const isActive = location.pathname === item.href;

//                 return (
//                   <Link key={item.name} to={item.href} target={item.target}>
//                     <Button
//                       variant={isActive ? "default" : "ghost"}
//                       size="sm"
//                       className="w-full justify-start relative flex items-center space-x-2"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <item.icon className="w-4 h-4" />
//                       <span>{item.name}</span>
//                       {item.important && (
//                         <Badge variant="destructive" className="ml-auto px-1 text-xs">
//                           Important
//                         </Badge>
//                       )}
//                     </Button>
//                   </Link>
//                 );
//               })}
//               <Link to={'/settings'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground "><User /> {'Settings'}</Link>
//               <div className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer" onClick={logOut}><LogOut className="text-red-500" /> {'Logout'}</div>
//               <Link to={'/transaction'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><Wallet /> {'Transactions(Withdraw/Deposite)'}</Link>

//             </div>
//           </div>
//         )}
//       </div>
//       <AddAccount open={isAddAcount} handleClose={() => setIsAddAcount(false)} />
//     </nav>
//   );
// };

// export default Navigation;

// src/components/Navigation.jsx

import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/useClickOutside"; // + Import the new hook

// UI & Icons
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, TrendingUp, Users, ShoppingCart, MessageCircle, Briefcase, Home, ShoppingBag, User, Settings, LogOut, Wallet } from "lucide-react";
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
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}
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