export function ComplianceEngineText({ result }: { result: boolean }) {
  return (
    <div className="flex">
      {result ? (
        <p className="bg-teal-600/10 rounded-lg py-1 px-3 my-2 text-xs text-success">
          Approved by Circle Compliance Engine ✓
        </p>
      ) : (
        <p className="bg-teal-600/10 rounded-lg py-1 px-3 my-2 text-xs text-error denied">
          Denied by Circle Compliance Engine ✘
        </p>
      )}
    </div>
  );
}
