import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 103,
        height: '100vh',
        background: 'var(--sidebar)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        borderRadius: '0 20px 20px 0',
        overflow: 'hidden',
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 0,
        }}
      >
        <div
          style={{
            width: 103,
            height: 103,
            background: 'var(--purple)',
            borderRadius: '0 20px 20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '50%',
              background: 'var(--purple-light)',
              borderRadius: '20px 0 20px 0',
            }}
          />
          <svg
            style={{ position: 'relative', zIndex: 1 }}
            width="40"
            height="38"
            viewBox="0 0 40 38"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.6942 0.693848H20.3002C25.8221 0.693848 30.3122 5.18459 30.3122 10.7065V20.3125C30.3122 25.8344 25.8221 30.3251 20.3002 30.3251H10.6942C5.17228 30.3251 0.682129 25.8344 0.682129 20.3125V10.7065C0.682129 5.18459 5.17228 0.693848 10.6942 0.693848Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.6321 37.3064H29.2381C34.76 37.3064 39.2501 32.8156 39.2501 27.2937V17.6877C39.2501 12.1658 34.76 7.67505 29.2381 7.67505H19.6321C14.1102 7.67505 9.62012 12.1658 9.62012 17.6877V27.2937C9.62012 32.8156 14.1102 37.3064 19.6321 37.3064Z"
              fill="white"
              fillOpacity="0.15"
            />
          </svg>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          paddingBottom: 24,
        }}
      >
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 8,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {theme === 'dark' ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle
                cx="10"
                cy="10"
                r="5"
                stroke="#858BB2"
                strokeWidth="1.5"
              />
              <line
                x1="10"
                y1="1"
                x2="10"
                y2="3.5"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="16.5"
                x2="10"
                y2="19"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="10"
                x2="3.5"
                y2="10"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="16.5"
                y1="10"
                x2="19"
                y2="10"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="3.22"
                y1="3.22"
                x2="4.99"
                y2="4.99"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="15.01"
                y1="15.01"
                x2="16.78"
                y2="16.78"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="3.22"
                y1="16.78"
                x2="4.99"
                y2="15.01"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="15.01"
                y1="4.99"
                x2="16.78"
                y2="3.22"
                stroke="#858BB2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.5 11.5C18.19 14.81 14.9 17.17 11 17.17C5.77 17.17 1.5 12.9 1.5 7.67C1.5 3.77 3.86 0.48 7.17 -0.83C3.49 3.23 3.84 9.52 7.94 13.17C12.04 16.82 18.33 16.5 22 13C21.13 12.07 20.4 11.83 19.5 11.5Z"
                fill="#858BB2"
              />
            </svg>
          )}
        </button>
        <div
          style={{
            width: 40,
            height: 1,
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        <img
          src="/user-profile.jpg"
          alt="User profile"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid transparent',
          }}
        />
      </div>
    </nav>
  );
}