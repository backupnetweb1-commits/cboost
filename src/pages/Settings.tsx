// // src/components/pages/Settings.tsx

// import React, { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { cn } from '@/lib/utils'; // A utility function to conditionally join class names
// import { useTranslation } from 'react-i18next';

// // Assuming these icons are available from lucide-react
// import { User, Shield, Settings as SettingsIcon } from 'lucide-react';

//   const { logOut, user } = useAuth();
//   const [activeSection, setActiveSection] = useState('profile');

//   // State for form inputs (unchanged)
//   const [firstName, setFirstName] = useState(user?.firstName || '');
//   const [lastName, setLastName] = useState(user?.lastName || '');
//   const [email, setEmail] = useState(user?.email || '');

//   const handleProfileUpdate = (e) => {
//     e.preventDefault();
//     console.log('Updating profile:', { firstName, lastName, email });
//   };

//   const handlePasswordUpdate = (e) => {
//     e.preventDefault();
//     console.log('Changing password...');
//   };

//   // Helper function to render the correct content based on activeSection
//   const renderContent = () => {
//   }
    
// const Settings = () => {
//   const { t } = useTranslation();
//   const { logOut, user } = useAuth();
//   const [activeSection, setActiveSection] = useState('profile');
//     switch (activeSection) {
//       case 'profile':
//         return (
//           <Card>
//             <CardHeader>
//               <CardTitle>Profile Information</CardTitle>
//               <CardDescription>Update your name and email address.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <form onSubmit={handleProfileUpdate} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <Button type="submit">Save Changes</Button>
//               </form>
//             </CardContent>
//           </Card>
//         );
//       case 'security':
//         return (
//           <Card>
//             <CardHeader>
//               <CardTitle>Change Password</CardTitle>
//               <CardDescription>Update your account password.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handlePasswordUpdate} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="currentPassword">Current Password</Label>
//                   <Input id="currentPassword" type="password" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newPassword">New Password</Label>
//                   <Input id="newPassword" type="password" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                   <Input id="confirmPassword" type="password" />
//                 </div>
//                 <Button type="submit">Change Password</Button>
//               </form>
//             </CardContent>
//           </Card>
//         );
//       case 'preferences':
//         return (
//           <Card>
//             <CardHeader>
//               <CardTitle>App Preferences</CardTitle>
//               <CardDescription>Customize your app experience.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-500">
//                 This section is a placeholder for future settings.
//               </p>
//             </CardContent>
//           </Card>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="settings-page w-full min-h-screen p-8 bg-gray-100 flex flex-col items-center">
//       {/* Page Header */}
//       <div className="w-full max-w-5xl flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
//           <p className="text-gray-600">
//             Manage your profile, security, and app preferences.
//           </p>
//         </div>
//         <Button onClick={logOut} variant="destructive">
//           Logout
//         </Button>
//       </div>

//       {/* Main Content Area: Two-Column Layout */}
//       <div className="main-content-container w-full max-w-5xl flex flex-col md:flex-row gap-8">
//         {/* Left Sidebar Navigation */}
//         <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-md self-start">
//           <nav className="flex flex-col space-y-2">
//             <button
//               onClick={() => setActiveSection('profile')}
//               className={cn(
//                 'flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors',
//                 activeSection === 'profile' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'
//               )}
//             >
//               <User size={18} />
//               <span>Profile</span>
//             </button>
//             <button
//               onClick={() => setActiveSection('security')}
//               className={cn(
//                 'flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors',
//                 activeSection === 'security' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'
//               )}
//             >
//               <Shield size={18} />
//               <span>Security</span>
//             </button>
//             <button
//               onClick={() => setActiveSection('preferences')}
//               className={cn(
//                 'flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors',
//                 activeSection === 'preferences' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'
//               )}
//             >
//               <SettingsIcon size={18} />
//               <span>App Preferences</span>
//             </button>
//           </nav>
//         </div>

//         {/* Right Content Area */}
//         <div className="w-full md:w-3/4">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

const Settings = () => {
  return <div className="settings-page">Settings Page - Under Construction</div>;
}

export default Settings;