"use client";
import React, { useEffect, useState } from 'react';
import ItemCard from "../components/ItemCard";

const BrowsePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]); // Replace with your item type

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Reported Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;