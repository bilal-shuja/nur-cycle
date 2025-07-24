import React from 'react'
import Header from './Header';
import { Card, CardContent } from "@/components/ui/card";

const UserProfileInfo = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-4">
                <Card className="bg-purple-ombre text-white border-none shadow-lg">
                    <CardContent className="p-6 text-center">

                        <h2 className="text-lg font-semibold mb-2 text-lavender-900">🌸 Daily Islamic Reminder 🌸</h2>

                    </CardContent>

                </Card>
            </div>
        </div>

    )
}

export default UserProfileInfo