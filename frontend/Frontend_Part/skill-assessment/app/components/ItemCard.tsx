import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Comment {
  user: string; // You can replace this with a user reference if you have a user model
  text: string;
  createdAt: Date;
}

interface Item {
  _id: string; // Ensure you have the correct type for the item ID
  title: string;
  description: string;
  category: string;
  status: "lost" | "found" | "claimed";
  location: string;
  contact: string;
  image: string;
  comments: Comment[];
}

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the comment to the server
    await fetch(`http://localhost:5000/api/items/${item._id}/comment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: 'Anonymous', text: commentText }), // Replace 'Anonymous' with actual user info
    });
    setCommentText("");
  };

  return (
    <Card className="border rounded-lg p-4 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={item.image} alt={item.title} className="w-full h-auto rounded-md mb-2" />
        <p>{item.description}</p>
        <span className="text-sm text-gray-600">{item.category}</span>
        <p className="text-sm">Location: {item.location}</p>
        <p className="text-sm">Contact: {item.contact}</p>

        <h3 className="mt-4 font-semibold">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mt-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="border rounded-md p-2 w-full"
          />
          <button type="submit" className="mt-2 bg-blue-600 text-white rounded-md p-2">
            Submit
          </button>
        </form>
        <div className="mt-2">
          {item.comments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <strong>{comment.user}</strong>: {comment.text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;