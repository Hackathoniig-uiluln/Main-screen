export interface Student {
  id: string;
  name: string;
  grade: string;
  points: number;
  avatar: string;
}

export interface Tree {
  id: string;
  name: string;
  species: string;
  plantedBy: string;
  plantedDate: string;
  location: string;
  health: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  lastWatered: string;
  image: string;
  description: string;
}

export interface Activity {
  id: string;
  treeId: string;
  studentId: string;
  type: 'watered' | 'fertilized' | 'pruned' | 'checked';
  points: number;
  date: string;
  notes?: string;
}
