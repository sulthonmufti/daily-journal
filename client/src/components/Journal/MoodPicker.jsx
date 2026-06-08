const moods = [
  { label: 'Terpuruk', emoji: '😭', score: 1 },
  { label: 'Sedih', emoji: '😔', score: 3 },
  { label: 'Biasa', emoji: '😐', score: 5 },
  { label: 'Senang', emoji: '🙂', score: 8 },
  { label: 'Luar Biasa', emoji: '🤩', score: 10 },
];

const MoodPicker = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#374151]">Bagaimana perasaan Anda hari ini?</label>
      <div className="flex flex-wrap gap-3">
        {moods.map((mood) => {
          const isSelected = selectedMood?.label === mood.label;
          return (
            <button
              key={mood.label}
              type="button"
              onClick={() => onMoodSelect(mood)}
              className={`flex items-center px-4 py-2 space-x-2 text-sm transition-all rounded-full border ${
                isSelected 
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm' 
                  : 'bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              <span className="text-lg">{mood.emoji}</span>
              <span className="font-medium">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodPicker;