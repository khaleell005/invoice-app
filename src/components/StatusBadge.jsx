const styles = {
  paid: { bg: 'var(--green-bg)', dot: 'var(--green)', text: 'var(--green)' },
  pending: { bg: 'var(--orange-bg)', dot: 'var(--orange)', text: 'var(--orange)' },
  draft: { bg: 'var(--draft-bg)', dot: 'var(--draft-dot)', text: 'var(--draft-text)' },
};

export default function StatusBadge({ status }) {
  const s = styles[status] || styles.draft;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: s.bg,
        borderRadius: 6,
        padding: '8px 16px',
        minWidth: 104,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: s.dot,
          opacity: status === 'draft' ? 0.5 : 1,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: s.text,
          textTransform: 'capitalize',
        }}
      >
        {status}
      </span>
    </span>
  );
}