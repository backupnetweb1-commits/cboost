import React, { useState } from "react";
import { useShop, Product } from "@/hooks/useShop";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  PlusCircle,
  List,
  ShoppingCart,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// --- Add Product Tab ---
const AddProductTab = ({
  handleAdd,
  formData,
  setFormData,
}: {
  handleAdd: () => void;
  formData: Product;
  setFormData: (val: Product) => void;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Add a New Product</CardTitle>
      <CardDescription>
        Fill out the details below to add a new item to the shop.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label>Product Name</label>
        <Input
          type="text"
          placeholder="e.g., Antminer S19"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label>Price ($)</label>
        <Input
          type="number"
          placeholder="e.g., 2999"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
      </div>
      <div className="space-y-2">
        <label>Hash Rate (optional)</label>
        <Input
          type="text"
          placeholder="e.g., 110 TH/s"
          value={formData.hashRate || ""}
          onChange={(e) => setFormData({ ...formData, hashRate: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label>Power Consumption</label>
        <Input
          type="text"
          placeholder="e.g., 3250W"
          value={formData.powerConsumption}
          onChange={(e) =>
            setFormData({ ...formData, powerConsumption: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <label>Efficiency (optional)</label>
        <Input
          type="text"
          placeholder="e.g., 29 J/TH"
          value={formData.efficiency || ""}
          onChange={(e) =>
            setFormData({ ...formData, efficiency: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <label>ROI</label>
        <Input
          type="text"
          placeholder="e.g., 12 months"
          value={formData.roi || ""}
          onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label>Image URL</label>
        <Input
          type="text"
          placeholder="e.g., https://example.com/image.jpg"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>

      <Button onClick={handleAdd} className="w-full sm:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </CardContent>
  </Card>
);

// --- Products Tab ---
const ProductsTab = ({
  products,
  editState,
  handlers,
}: {
  products: Product[];
  editState: { editId: number | string | null; formData: Product };
  handlers: {
    setFormData: (val: Product) => void;
    setEditId: (val: number | string | null) => void;
    startEdit: (item: Product) => void;
    handleUpdate: () => void;
    handleDelete: (id: number | string) => void;
  };
}) => {
  const { editId, formData } = editState;
  const { setFormData, handleUpdate, startEdit, handleDelete, setEditId } =
    handlers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Products</CardTitle>
        <CardDescription>
          View, edit, or delete existing shop items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Power</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">${Number(item.price).toFixed(2)}</td>
                  <td className="p-4">{item.powerConsumption}</td>
                  <td className="p-4 flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editId !== null && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-semibold mb-4">Editing "{formData.name}"</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
              <Input
                type="text"
                placeholder="Power Consumption"
                value={formData.powerConsumption}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    powerConsumption: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="ROI"
                value={formData.roi || ""}
                onChange={(e) =>
                  setFormData({ ...formData, roi: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleUpdate}>Update</Button>
              <Button variant="outline" onClick={() => setEditId(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- Bought Products Tab ---
const BoughtProductsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Purchase History</CardTitle>
      <CardDescription>A log of all products bought by users.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
        <p>Purchase history will be displayed here.</p>
      </div>
    </CardContent>
  </Card>
);

// --- Main Component ---
const AdminShopManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "products" | "addProduct" | "boughtProducts"
  >("products");
  const { products, isLoading, error, createProduct, updateProduct, deleteProduct } = useShop();

  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    hashRate: "",
    powerConsumption: "",
    efficiency: "",
    roi: null,
    inStock: true,
    image: "",
  });
  const [editId, setEditId] = useState<number | string | null>(null);

  // Add product
  const handleAdd = async () => {
    if (!formData.name || !formData.price || !formData.powerConsumption || !formData.image)
      return;
    await createProduct(formData);
    setFormData({
      name: "",
      price: 0,
      hashRate: "",
      powerConsumption: "",
      efficiency: "",
      roi: null,
      inStock: true,
      image: "",
    });
    setActiveTab("products");
  };

  // Delete
  const handleDelete = async (id: number | string) => {
    await deleteProduct(id);
  };

  // Edit
  const startEdit = (item: Product) => {
    setEditId(item.name); // assuming name is unique, else replace with `item.id`
    setFormData(item);
  };

  // Update
  const handleUpdate = async () => {
    if (editId === null) return;
    //await updateProduct(editId, formData);
    setEditId(null);
  };

  // Render
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-destructive">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <p>Failed to load products: {error.message}</p>
        </div>
      );
    }

    switch (activeTab) {
      case "products":
        return (
          <ProductsTab
            products={products || []}
            editState={{ editId, formData }}
            handlers={{ startEdit, handleDelete, handleUpdate, setEditId, setFormData }}
          />
        );
      case "addProduct":
        return <AddProductTab handleAdd={handleAdd} formData={formData} setFormData={setFormData} />;
      case "boughtProducts":
        return <BoughtProductsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6 mt-16">
      <h2 className="text-2xl font-bold">Shop Management</h2>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "products"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="inline-block mr-2 h-4 w-4" /> All Products
          </button>
          <button
            onClick={() => setActiveTab("addProduct")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "addProduct"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PlusCircle className="inline-block mr-2 h-4 w-4" /> Add Product
          </button>
          <button
            onClick={() => setActiveTab("boughtProducts")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "boughtProducts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingCart className="inline-block mr-2 h-4 w-4" /> Bought Products
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminShopManager;
