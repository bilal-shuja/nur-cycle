
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FastingGuidance = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Fasting & Prayer During Menstruation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Ramadan Fasting</h4>
            <p className="text-green-700 text-sm">
              Women are excused from fasting during menstruation and must make up the missed days later. 
              This is Allah's mercy upon women, not a punishment.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Prayer (Salah)</h4>
            <p className="text-green-700 text-sm">
              Completely excused from all obligatory and voluntary prayers. 
              No need to make up missed prayers - this is a special concession from Allah.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FastingGuidance;
