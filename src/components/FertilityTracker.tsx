
import React from 'react';
import { Heart, Thermometer, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FertilityTracker = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fertility Tracking</h1>
        <p className="text-gray-600">Monitor your fertility signs with Islamic guidance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              <span>Basal Body Temperature</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">98.2°F</p>
            <p className="text-sm text-gray-600">Today's temperature</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span>Cervical Mucus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-blue-600">Egg White</p>
            <p className="text-sm text-gray-600">High fertility sign</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span>Cervix Position</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-pink-600">High & Soft</p>
            <p className="text-sm text-gray-600">Fertile position</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FertilityTracker;
