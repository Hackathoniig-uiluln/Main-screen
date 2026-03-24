import { useState } from 'react';
import { useNavigate } from 'react-router';
import { addTree, getCurrentUser } from '../utils/storage';
import { Tree } from '../types';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function AddTree() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to add a tree');
      return;
    }

    const newTree: Tree = {
      id: Date.now().toString(),
      name: formData.name,
      species: formData.species,
      plantedBy: currentUser.name,
      plantedDate: new Date().toISOString().split('T')[0],
      location: formData.location,
      health: 'Excellent',
      lastWatered: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1678687975041-f3f1dd854210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHRyZWUlMjBzYXBsaW5nJTIwcGxhbnRlZHxlbnwxfHx8fDE3NzQwODA4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: formData.description,
    };

    addTree(newTree);
    toast.success('Tree added successfully!', {
      description: 'You earned 50 points for planting a new tree!',
    });
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2 text-white/90 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-3xl mb-2">Add New Tree</h1>
        <p className="text-green-100">Register a newly planted tree</p>
      </div>

      {/* Form */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tree Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Oak Guardian"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Species *
            </label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="e.g., Red Oak"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Front Garden"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about this tree..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <span className="font-medium">Planted by:</span>
              <span>{currentUser?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-800 mt-1">
              <span className="font-medium">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="mt-2 text-sm text-green-700">
              🎉 You'll earn <strong>50 points</strong> for planting this tree!
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Add Tree
          </button>
        </form>
      </div>
    </div>
  );
}
