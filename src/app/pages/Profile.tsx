import { useEffect, useState } from 'react';
import { getCurrentUser, getActivitiesForStudent, initializeData } from '../utils/storage';
import { Student, Activity } from '../types';
import { Trophy, Star, Droplet, Sprout } from 'lucide-react';

export function Profile() {
  const [user, setUser] = useState<Student | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    initializeData();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setActivities(getActivitiesForStudent(currentUser.id));
    }
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const activityStats = {
    watered: activities.filter(a => a.type === 'watered').length,
    fertilized: activities.filter(a => a.type === 'fertilized').length,
    pruned: activities.filter(a => a.type === 'pruned').length,
    checked: activities.filter(a => a.type === 'checked').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 pb-12">
        <h1 className="text-2xl mb-6">My Profile</h1>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-2xl mb-1">{user.name}</h2>
            <p className="text-green-100">{user.grade}</p>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl mb-1 text-green-600">{user.points}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600"
              style={{ width: `${Math.min((user.points / 600) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {600 - user.points > 0 ? `${600 - user.points} points to next level` : 'Max level reached!'}
          </p>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="px-4 mb-6">
        <h2 className="text-lg mb-3">Activity Summary</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Droplet className="w-6 h-6 text-blue-500" />
              <span className="text-2xl font-medium">{activityStats.watered}</span>
            </div>
            <div className="text-sm text-gray-600">Times Watered</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Sprout className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-medium">{activityStats.fertilized}</span>
            </div>
            <div className="text-sm text-gray-600">Times Fertilized</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-6 h-6 text-purple-500" />
              <span className="text-2xl font-medium">{activityStats.checked}</span>
            </div>
            <div className="text-sm text-gray-600">Health Checks</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-6 h-6 text-orange-500" />
              <span className="text-2xl font-medium">{activities.length}</span>
            </div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4">
        <h2 className="text-lg mb-3">Achievements</h2>
        <div className="space-y-3">
          <div className={`p-4 rounded-lg ${user.points >= 100 ? 'bg-green-50 border border-green-200' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user.points >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Tree Caretaker</div>
                <div className="text-sm text-gray-600">Earn 100 points</div>
              </div>
              {user.points >= 100 && <span className="text-green-600 text-sm">✓</span>}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${activityStats.watered >= 5 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activityStats.watered >= 5 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Water Master</div>
                <div className="text-sm text-gray-600">Water trees 5 times</div>
              </div>
              {activityStats.watered >= 5 && <span className="text-blue-600 text-sm">✓</span>}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${user.points >= 500 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user.points >= 500 ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Green Champion</div>
                <div className="text-sm text-gray-600">Earn 500 points</div>
              </div>
              {user.points >= 500 && <span className="text-yellow-600 text-sm">✓</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
