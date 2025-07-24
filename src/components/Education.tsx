
import React from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Education = () => {
  const topics = [
    {
      title: "Understanding Your Cycle",
      description: "Learn about the phases of menstruation from an Islamic perspective",
      icon: BookOpen,
      color: "bg-lavender-100 text-lavender-600"
    },
    {
      title: "Intimacy in Islam",
      description: "Guidelines for healthy relationships according to Quran and Sunnah",
      icon: Heart,
      color: "bg-lavender-200 text-lavender-700"
    },
    {
      title: "Preparing for Motherhood",
      description: "Islamic guidance on pregnancy and preparing for children",
      icon: Users,
      color: "bg-lavender-300 text-lavender-800"
    }
  ];

  return (
    <div className="space-y-6 section-3d p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Education & Wellness</h1>
        <p className="text-gray-600">Learn about women's health through Islamic teachings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${topic.color} flex items-center justify-center mb-4 circular-3d`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{topic.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
