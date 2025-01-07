export function FormErrorText({ value }: { value?: unknown }) {
  return (
    <p className="text-sm text-destructive" style={{ minHeight: 20, paddingLeft: 13 }}>
      {typeof value === 'object'
        ? JSON.stringify(value)
        : typeof value === 'string'
          ? String(value)
          : ' '}
    </p>
  );
}
