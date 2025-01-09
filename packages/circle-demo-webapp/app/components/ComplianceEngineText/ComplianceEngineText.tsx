export function ComplianceEngineText({ result }: { result: boolean }) {
  return (
    <div className="compliance-engine-text-container">
      {result ? (
        <p className="text-sm compliance-engine-text">
          Approved by Circle Compliance Engine ✓
        </p>
      ) : (
        <p className="text-sm compliance-engine-text denied">
          Denied by Circle Compliance Engine ✘
        </p>
      )}
    </div>
  );
}
