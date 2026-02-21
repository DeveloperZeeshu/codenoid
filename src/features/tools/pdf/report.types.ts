export interface ParsedReport {
  severity: number | null;
  severityLabel: string;
  issues: string[];
  codeLines: string[];
  explanation: string;
}