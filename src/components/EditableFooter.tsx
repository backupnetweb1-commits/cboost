import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { Edit, Save, X, Phone, MessageSquare } from "lucide-react";

interface SocialContact {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
}

interface FooterData {
  socialContacts: SocialContact[];
  phoneNumbers: string[];
  adminTelegram: string;
  adminWhatsApp: string;
}

const EditableFooter = () => {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const [footerData, setFooterData] = useState<FooterData>({
    socialContacts: [
      { id: "1", platform: "Telegram", url: "https://t.me/yourgroup", icon: "TG", color: "bg-blue-500" },
      { id: "2", platform: "Facebook", url: "https://facebook.com/yourpage", icon: "FB", color: "bg-blue-600" },
      { id: "3", platform: "Instagram", url: "https://instagram.com/yourprofile", icon: "IG", color: "bg-pink-500" },
      { id: "4", platform: "WhatsApp", url: "https://wa.me/yourgroup", icon: "WA", color: "bg-green-500" }
    ],
    phoneNumbers: ["+1234567890", "+0987654321"],
    adminTelegram: "https://t.me/admin",
    adminWhatsApp: "https://wa.me/adminphone"
  });

  const [editData, setEditData] = useState<FooterData>(footerData);

  const handleSave = () => {
    setFooterData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(footerData);
    setIsEditing(false);
  };

  const updateSocialContact = (id: string, field: keyof SocialContact, value: string) => {
    setEditData(prev => ({
      ...prev,
      socialContacts: prev.socialContacts.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const updatePhoneNumber = (index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((phone, i) => i === index ? value : phone)
    }));
  };
if(location.pathname === "/user-dashboard" || location.pathname === "/admin-dashboard"){
  return (
    <div className='h-16 w-full bg-gradient-card border-t border-border/50' ></div>
  )
}
  return (
    <footer className="bg-gradient-card border-t border-border/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Admin Edit Button */}
        <div className="flex justify-end mb-6">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Footer
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <Card className="bg-gradient-subtle border-border/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="space-y-3">
                {(isEditing ? editData : footerData).socialContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${contact.color} rounded text-white text-sm flex items-center justify-center flex-shrink-0`}>
                      {contact.icon}
                    </div>
                    {isEditing ? (
                      <div className="flex-1 space-y-2">
                        <Input
                          value={contact.platform}
                          onChange={(e) => updateSocialContact(contact.id, 'platform', e.target.value)}
                          placeholder="Platform name"
                          className="text-sm"
                        />
                        <Input
                          value={contact.url}
                          onChange={(e) => updateSocialContact(contact.id, 'url', e.target.value)}
                          placeholder="URL"
                          className="text-sm"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-foreground">{contact.platform}</div>
                        <a 
                          href={contact.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-accent"
                        >
                          Join our community
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-subtle border-border/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Contact Us
              </h3>
              <div className="space-y-3">
                {(isEditing ? editData : footerData).phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-accent" />
                    {isEditing ? (
                      <Input
                        value={phone}
                        onChange={(e) => updatePhoneNumber(index, e.target.value)}
                        placeholder="Phone number"
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-muted-foreground">{phone}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin Contact */}
          <Card className="bg-gradient-subtle border-border/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Admin Support
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  {isEditing ? (
                    <Input
                      value={editData.adminTelegram}
                      onChange={(e) => setEditData(prev => ({ ...prev, adminTelegram: e.target.value }))}
                      placeholder="Admin Telegram URL"
                      className="text-sm"
                    />
                  ) : (
                    <a 
                      href={footerData.adminTelegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent"
                    >
                      Telegram Admin
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  {isEditing ? (
                    <Input
                      value={editData.adminWhatsApp}
                      onChange={(e) => setEditData(prev => ({ ...prev, adminWhatsApp: e.target.value }))}
                      placeholder="Admin WhatsApp URL"
                      className="text-sm"
                    />
                  ) : (
                    <a 
                      href={footerData.adminWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent"
                    >
                      WhatsApp Admin
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CryptoBoy Investment Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EditableFooter;