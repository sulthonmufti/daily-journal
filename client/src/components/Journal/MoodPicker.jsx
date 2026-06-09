import { 
  CloudRain, 
  Angry, 
  Frown, 
  Annoyed, 
  Moon,
  Meh, 
  Coffee, 
  Smile, 
  Zap,
  Sparkles 
} from 'lucide-react';

const moods = [
  { label: 'Terpuruk', icon: CloudRain, color: '#1e293b', score: 1 },
  { label: 'Marah', icon: Angry, color: '#dc2626', score: 2 },
  { label: 'Sedih', icon: Frown, color: '#3b82f6', score: 3 },
  { label: 'Kesal', icon: Annoyed, color: '#ea580c', score: 4 },
  { label: 'Lelah', icon: Moon, color: '#8b5cf6', score: 4 },
  { label: 'Biasa', icon: Meh, color: '#9ca3af', score: 5 },
  { label: 'Tenang', icon: Coffee, color: '#14b8a6', score: 7 },
  { label: 'Senang', icon: Smile, color: '#10b981', score: 8 },
  { label: 'Semangat', icon: Zap, color: '#f59e0b', score: 9 },
  { label: 'Luar Biasa', icon: Sparkles, color: '#ec4899', score: 10 },
];

const MoodPicker = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#374151]">
        Bagaimana perasaan Anda hari ini?
      </label>
      <div className="flex flex-wrap gap-2 md:gap-2.5">
        {moods.map((mood) => {
          const isSelected = selectedMood?.label === mood.label;
          const IconComponent = mood.icon;

          return (
            <button
              key={mood.label}
              type="button"
              onClick={() => onMoodSelect(mood)}
              style={{
                borderColor: isSelected ? mood.color : '#e5e7eb',
                backgroundColor: isSelected ? `${mood.color}15` : '#ffffff',
                color: isSelected ? mood.color : '#6b7280'
              }}
              className={`flex items-center px-3 py-1.5 md:px-4 md:py-2 space-x-1.5 md:space-x-2 text-xs md:text-sm transition-all duration-200 rounded-full border cursor-pointer hover:-translate-y-0.5 hover:shadow-sm ${
                !isSelected 
                  ? 'hover:border-[#d1d5db] hover:text-[#374151] hover:bg-gray-50' 
                  : 'hover:brightness-95'
              }`}
            >
              <span 
                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" 
                style={{ backgroundColor: mood.color }}
              />
              
              <IconComponent 
                size={16} 
                strokeWidth={isSelected ? 2.5 : 2} 
                className="transition-transform duration-200"
                style={{ transform: isSelected ? 'scale(1.1)' : 'scale(1)' }}
              />
              
              <span className={`font-medium ${isSelected ? 'font-semibold' : ''}`}>
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodPicker;