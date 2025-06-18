
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Plus, Trash2, Edit, User } from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "John Doe", phone: "+1-555-0101", relationship: "Family" },
    { id: "2", name: "Jane Smith", phone: "+1-555-0102", relationship: "Friend" },
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", relationship: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      setContacts(contacts.map(contact => 
        contact.id === editingId 
          ? { ...contact, ...formData }
          : contact
      ));
      toast.success("Contact updated successfully");
      setEditingId(null);
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData
      };
      setContacts([...contacts, newContact]);
      toast.success("Contact added successfully");
    }

    setFormData({ name: "", phone: "", relationship: "" });
    setIsAdding(false);
  };

  const handleEdit = (contact: Contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    });
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed");
  };

  const handleCall = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
    toast.info(`Calling ${name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
            <p className="text-gray-600">Manage your trusted emergency contacts</p>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </Card>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Contact" : "Add New Contact"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1-555-0123"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                placeholder="Family, Friend, Colleague, etc."
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                {editingId ? "Update Contact" : "Add Contact"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ name: "", phone: "", relationship: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card className="p-8 text-center bg-gray-50">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts added yet</h3>
            <p className="text-gray-600">Add your first emergency contact to get started</p>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id} className="p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-gray-600">{contact.phone}</p>
                    {contact.relationship && (
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleCall(contact.phone, contact.name)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    onClick={() => handleEdit(contact)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(contact.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
