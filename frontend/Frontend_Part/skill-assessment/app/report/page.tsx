"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import ItemCard from "../components/ItemCard"; 

const ReportPage: React.FC = () => {
  const [type, setType] = useState<"lost" | "found">("lost");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle image upload
    let imageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      imageUrl = data.url; // Assuming the response contains the image URL
    }
  
    const newItem = { title, description, category, type, location, contact, image: imageUrl };
    const response = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
  
    const savedItem = await response.json();
    setItems([...items, savedItem]); // Add the new item to the list
    // Reset form fields
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setContact("");
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Report Lost/Found Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "lost" | "found")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact (Email/Phone)</label>
          <Input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md p-2">
          Submit
        </Button>
      </form>

      <h2 className="text-2xl font-bold mt-8">Reported Items</h2>
      <div className="grid grid-cols-1 gap-6 mt-4">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ReportPage;