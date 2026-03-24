import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTrees, initializeData } from '../utils/storage';
import { Tree } from '../types';
import { Droplet, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function TreeList() {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    initializeData();
    setTrees(getTrees());
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Excellent':
        return 'bg-green-500';
      case 'Good':
        return 'bg-blue-500';
      case 'Fair':
        return 'bg-yellow-500';
      case 'Poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 pb-8">
        <h1 className="text-3xl mb-2">Tree Care Monitor</h1>
        <p className="text-green-100">Track and care for our school trees</p>
      </div>

      {/* Stats Card */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">{trees.length}</div>
            <div className="text-xs text-gray-600">Total Trees</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-2xl mb-1 text-green-600">
              {trees.filter(t => t.health === 'Excellent').length}
            </div>
            <div className="text-xs text-gray-600">Excellent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1 text-blue-600">
              {trees.filter(t => t.health === 'Good').length}
            </div>
            <div className="text-xs text-gray-600">Good</div>
          </div>
        </div>
      </div>

      {/* Tree List */}
      <div className="px-4 space-y-4">
        {trees.map((tree) => (
          <Link
            key={tree.id}
            to={`/tree/${tree.id}`}
            className="block bg-white rounded-lg shadow-sm overflow-hidden active:scale-98 transition-transform"
          >
            <div className="flex">
              <div className="w-24 h-24 flex-shrink-0">
                <ImageWithFallback
                  src={tree.image}
                  alt={tree.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{tree.name}</h3>
                    <p className="text-sm text-gray-600">{tree.species}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs text-white ${getHealthColor(
                      tree.health
                    )}`}
                  >
                    {tree.health}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {tree.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplet className="w-3 h-3" />
                    {new Date(tree.lastWatered).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
