import { useState } from 'react';
import { UserProfile } from '../types';

export function StudentForm({ onSubmit }: { onSubmit: (data: UserProfile) => void }) {
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [casteCommunity, setCasteCommunity] = useState('');
  const [cgpaOr12Percentage, setCgpaOr12Percentage] = useState<number | ''>('');
  const [familyIncome, setFamilyIncome] = useState<number | ''>('');
  const [isSingleChild, setIsSingleChild] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      stateOfResidence,
      casteCommunity,
      cgpaOr12Percentage: Number(cgpaOr12Percentage),
      familyIncome: Number(familyIncome),
      isSingleChild,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">State of Residence:</label>
        <input
          type="text"
          value={stateOfResidence}
          onChange={(e) => setStateOfResidence(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Caste/Community:</label>
        <input
          type="text"
          value={casteCommunity}
          onChange={(e) => setCasteCommunity(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">CGPA (or 12th Percentage):</label>
        <input
          type="number"
          value={cgpaOr12Percentage}
          onChange={(e) => setCgpaOr12Percentage(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Family Income:</label>
        <input
          type="number"
          value={familyIncome}
          onChange={(e) => setFamilyIncome(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSingleChild}
          onChange={(e) => setIsSingleChild(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Are you a single child?</label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Get Recommendations
      </button>
    </form>
  );
}