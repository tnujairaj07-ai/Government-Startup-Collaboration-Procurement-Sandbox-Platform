/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          royal: '#1D64EC',
          cobalt: '#0D4CD3',
          blue: '#2563EB',
          sky: '#DDEBFC',
          'sky-light': '#E8F2FE',
          'sky-mesh': '#E0EFFF',
          azure: '#8BB9FE',
        },
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        slate: {
          muted: '#64748B',
          light: '#94A3B8',
          border: 'rgba(226, 232, 240, 0.8)',
        },
        status: {
          emerald: '#10B981',
          'emerald-bg': '#ECFDF5',
          'emerald-text': '#059669',
          amber: '#D97706',
          'amber-bg': '#FEF3C7',
          crimson: '#DC2626',
          'crimson-bg': '#FEE2E2',
          violet: '#7C3AED',
          'violet-bg': '#F3E8FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '32px',
        '2xl': '24px',
        'xl': '16px',
        'lg': '12px',
      },
      boxShadow: {
        'glass': '0 10px 25px -5px rgba(37, 99, 235, 0.08), 0 8px 10px -6px rgba(37, 99, 235, 0.04)',
        'glass-hover': '0 20px 30px -10px rgba(37, 99, 235, 0.14), 0 10px 15px -5px rgba(37, 99, 235, 0.08)',
        'action': '0 4px 14px 0 rgba(29, 100, 236, 0.35)',
        'action-hover': '0 6px 20px 0 rgba(29, 100, 236, 0.48)',
        'card': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'metric-gradient': 'linear-gradient(145deg, #1D64EC 0%, #38BDF8 100%)',
        'ambient-mesh': 'radial-gradient(circle at 10% 20%, #E0EFFF 0%, #C7E0FE 40%, #1D64EC 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.65) 100%)',
        'badge-gradient': 'linear-gradient(135deg, #2563EB 0%, #1D64EC 100%)',
      }
    },
  },
  plugins: [],
}
