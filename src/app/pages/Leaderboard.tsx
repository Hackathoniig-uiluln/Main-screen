import { useEffect, useState } from 'react';
import { getStudents, initializeData } from '../utils/storage';
import { Student } from '../types';
import { Trophy, Medal } from 'lucide-react';

export function Leaderboard() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    initializeData();
    const allStudents = getStudents().sort((a, b) => b.points - a.points);
    setStudents(allStudents);
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-orange-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 pb-8">
        <h1 className="text-3xl mb-2">Leaderboard</h1>
        <p className="text-yellow-100">Top tree caretakers</p>
      </div>

      {/* Top 3 Podium */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center items-end gap-4">
            {students.slice(0, 3).map((student, index) => {
              const heights = ['h-20', 'h-24', 'h-16'];
              const positions = [1, 0, 2]; // Center, Left, Right
              const actualIndex = positions.indexOf(index);
              
              return (
                <div key={student.id} className="flex flex-col items-center" style={{ order: positions[index] }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium mb-2">
                    {student.avatar}
                  </div>
                  <div className={`w-20 ${heights[actualIndex]} bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg flex flex-col items-center justify-center text-white`}>
                    <div className="text-2xl mb-1">{actualIndex + 1}</div>
                    <div className="text-xs">{student.points}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="px-4">
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {students.map((student, index) => (
            <div key={student.id} className="flex items-center gap-4 p-4">
              <div className="w-8 text-center font-medium text-gray-600">
                {getRankIcon(index) || `#${index + 1}`}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium">
                {student.avatar}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{student.name}</div>
                <div className="text-sm text-gray-500">{student.grade}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-green-600">{student.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
