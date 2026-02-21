export const getSeverityColor = (score: number | null): string => {

  if (!score) return '#6b7280';

  if (score >= 9) return '#dc2626';

  if (score >= 7) return '#ea580c';

  if (score >= 4) return '#ca8a04';

  return '#16a34a';

};