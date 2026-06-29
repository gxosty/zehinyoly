import { iconComponents, iconOptions } from './courseIcons'

export default function IconPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {iconOptions.map((opt) => {
        const Icon = opt.value ? iconComponents[opt.value] : null
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
              isSelected
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
            title={opt.label}
          >
            {Icon ? <Icon size={20} /> : <span className="text-lg">—</span>}
          </button>
        )
      })}
    </div>
  )
}
