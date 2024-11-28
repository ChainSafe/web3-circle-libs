/**
 * Shortens a full name into initials.
 * Example: "Rob McIntosh" -> "RM"
 *
 * @param fullName - The full name to be shortened.
 * @returns A string containing the initials.
 */
export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');
}
