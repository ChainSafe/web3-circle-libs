interface FormErrorTextProps {
  message?: string;
}

export function FormErrorText({ message }: FormErrorTextProps) {
  return (
    message && (
      <p role="alert" className="text-sm text-destructive mt-1">
        {message}
      </p>
    )
  );
}
