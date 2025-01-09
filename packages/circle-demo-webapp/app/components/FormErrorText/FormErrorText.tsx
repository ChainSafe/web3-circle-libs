export function FormErrorText({ value }: { value?: unknown }) {
  return (
    <p className="text-sm error-text">
      {typeof value === 'object'
        ? JSON.stringify(value)
        : typeof value === 'string'
          ? String(value)
          : ' '}
    </p>
  );
}
