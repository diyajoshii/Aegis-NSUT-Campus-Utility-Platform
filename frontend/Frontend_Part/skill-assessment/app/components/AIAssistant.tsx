import { useState } from 'react';
import { UserProfile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Bot } from 'lucide-react';
import { StudentForm } from './StudentForm';

export function AIAssistant() {
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateSchemeRecommendations = async (userData: UserProfile) => {
    setIsLoading(true);
    try {
      const prompt = `
        Based on the following user profile, recommend suitable government schemes:
        
        State of Residence: ${userData.stateOfResidence}
        Caste/Community: ${userData.casteCommunity}
        CGPA (or 12th Percentage): ${userData.cgpaOr12Percentage}
        Family Income: ₹${userData.familyIncome}
        Single Child: ${userData.isSingleChild ? 'Yes' : 'No'}
      `;

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error('Failed to get recommendations');
      
      const data = await response.json();
      setRecommendations(data.choices?.[0]?.message?.content || 'No recommendations available');

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-8 shadow-lg rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#89A071]" />
            <span className="text-lg font-semibold">Pathya</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <StudentForm onSubmit={generateSchemeRecommendations} />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Loader className="animate-spin h-6 w-6 text-[#89A071]" />
            <span className="ml-2 text-gray-600">Generating recommendations...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Recommendations */}
        {recommendations && (
          <div className="mt-4 prose max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: recommendations.replace(/\n/g, '<br />') 
              }} 
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* Initial State */}
        {!recommendations && !error && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <span>Fill out the form to get started!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}