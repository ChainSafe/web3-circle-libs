export function FormErrorText({ value }: { value?: unknown }) {
  return (
    <p className="text-sm min-h-6 mt-1 mb-2  text-error">
      {typeof value === 'object'
        ? JSON.stringify(value)
        : typeof value === 'string'
          ? String(value)
          : ' '}
    </p>
  );
}
