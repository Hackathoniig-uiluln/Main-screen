import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getTree, getActivitiesForTree, addActivity, getCurrentUserId, updateTree } from '../utils/storage';
import { Tree, Activity } from '../types';
import { ArrowLeft, Droplet, Sprout, Scissors, Eye, MapPin, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function TreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tree, setTree] = useState<Tree | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (id) {
      const treeData = getTree(id);
      if (treeData) {
        setTree(treeData);
        setActivities(getActivitiesForTree(id));
      }
    }
  }, [id]);

  const handleActivity = (type: Activity['type'], points: number) => {
    if (!tree) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      treeId: tree.id,
      studentId: getCurrentUserId(),
      type,
      points,
      date: new Date().toISOString().split('T')[0],
    };

    addActivity(newActivity);
    
    // Update tree's last watered date if watering
    if (type === 'watered') {
      const updatedTree = { ...tree, lastWatered: newActivity.date };
      updateTree(updatedTree);
      setTree(updatedTree);
    }

    setActivities(getActivitiesForTree(tree.id));
    toast.success(`+${points} points! Tree ${type}`, {
      description: 'Great job taking care of the tree!',
    });
  };

  if (!tree) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const careActions = [
    { type: 'watered' as const, icon: Droplet, label: 'Water', points: 10, color: 'bg-blue-500' },
    { type: 'fertilized' as const, icon: Sprout, label: 'Fertilize', points: 20, color: 'bg-green-500' },
    { type: 'pruned' as const, icon: Scissors, label: 'Prune', points: 15, color: 'bg-orange-500' },
    { type: 'checked' as const, icon: Eye, label: 'Check Health', points: 5, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={tree.image}
          alt={tree.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl text-white drop-shadow-lg">{tree.name}</h1>
          <p className="text-white/90 drop-shadow">{tree.species}</p>
        </div>
      </div>

      {/* Tree Info */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Planted by</div>
              <div className="font-medium">{tree.plantedBy}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Planted on</div>
              <div className="font-medium">{new Date(tree.plantedDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm mb-3">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{tree.location}</span>
        </div>
        <p className="text-gray-700 text-sm">{tree.description}</p>
      </div>

      {/* Care Actions */}
      <div className="p-4">
        <h2 className="text-lg mb-3">Care Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {careActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.type}
                onClick={() => handleActivity(action.type, action.points)}
                className={`${action.color} text-white p-4 rounded-lg active:scale-95 transition-transform`}
              >
                <Icon className="w-6 h-6 mb-2 mx-auto" />
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-90">+{action.points} pts</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <h2 className="text-lg mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center py-4 text-sm">No activities yet</p>
          ) : (
            activities.slice(-5).reverse().map((activity) => (
              <div key={activity.id} className="bg-white p-3 rounded-lg text-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium capitalize">{activity.type}</span>
                  <span className="text-green-600 font-medium">+{activity.points} pts</span>
                </div>
                <div className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
                {activity.notes && <p className="text-xs text-gray-600 mt-1">{activity.notes}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
