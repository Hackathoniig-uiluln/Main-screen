import { Student, Tree, Activity } from '../types';
import { mockStudents, mockTrees, mockActivities } from '../data/mockData';

const STORAGE_KEYS = {
  STUDENTS: 'treecare_students',
  TREES: 'treecare_trees',
  ACTIVITIES: 'treecare_activities',
  CURRENT_USER: 'treecare_current_user',
};

// Initialize data
export function initializeData() {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(mockStudents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TREES)) {
    localStorage.setItem(STORAGE_KEYS.TREES, JSON.stringify(mockTrees));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(mockActivities));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, '1'); // Emma Johnson as default
  }
}

// Students
export function getStudents(): Student[] {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return data ? JSON.parse(data) : [];
}

export function getStudent(id: string): Student | undefined {
  return getStudents().find(s => s.id === id);
}

export function updateStudent(student: Student) {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index !== -1) {
    students[index] = student;
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }
}

// Trees
export function getTrees(): Tree[] {
  const data = localStorage.getItem(STORAGE_KEYS.TREES);
  return data ? JSON.parse(data) : [];
}

export function getTree(id: string): Tree | undefined {
  return getTrees().find(t => t.id === id);
}

export function addTree(tree: Tree) {
  const trees = getTrees();
  trees.push(tree);
  localStorage.setItem(STORAGE_KEYS.TREES, JSON.stringify(trees));
}

export function updateTree(tree: Tree) {
  const trees = getTrees();
  const index = trees.findIndex(t => t.id === tree.id);
  if (index !== -1) {
    trees[index] = tree;
    localStorage.setItem(STORAGE_KEYS.TREES, JSON.stringify(trees));
  }
}

// Activities
export function getActivities(): Activity[] {
  const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  return data ? JSON.parse(data) : [];
}

export function getActivitiesForTree(treeId: string): Activity[] {
  return getActivities().filter(a => a.treeId === treeId);
}

export function getActivitiesForStudent(studentId: string): Activity[] {
  return getActivities().filter(a => a.studentId === studentId);
}

export function addActivity(activity: Activity) {
  const activities = getActivities();
  activities.push(activity);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  
  // Update student points
  const student = getStudent(activity.studentId);
  if (student) {
    student.points += activity.points;
    updateStudent(student);
  }
}

// Current User
export function getCurrentUserId(): string {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '1';
}

export function getCurrentUser(): Student | undefined {
  return getStudent(getCurrentUserId());
}

export function setCurrentUser(id: string) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, id);
}
