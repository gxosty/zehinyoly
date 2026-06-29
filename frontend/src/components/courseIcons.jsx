import {
  BookOpen, Languages, Brain, Atom, FlaskConical, Leaf,
  Music, Globe, Pen, Calculator,
} from 'lucide-react'

export const iconComponents = {
  BookOpen, Languages, Brain, Atom, FlaskConical, Leaf,
  Music, Globe, Pen, Calculator,
}

export const iconOptions = [
  { value: '', label: 'None (default BookOpen)' },
  { value: 'Languages', label: 'Languages' },
  { value: 'Brain', label: 'Brain' },
  { value: 'Atom', label: 'Atom' },
  { value: 'FlaskConical', label: 'FlaskConical' },
  { value: 'Leaf', label: 'Leaf' },
  { value: 'Music', label: 'Music' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Pen', label: 'Pen' },
  { value: 'Calculator', label: 'Calculator' },
]

export function getIcon(name) {
  return iconComponents[name] || BookOpen
}

export const iconColors = [
  'bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500',
  'bg-indigo-500', 'bg-teal-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500',
]
