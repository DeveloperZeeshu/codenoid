import { ParsedReport } from './report.types';

export const parseReportContent = (raw: string): ParsedReport => {

  if (!raw || typeof raw !== 'string') {
    return {
      severity: null,
      severityLabel: 'N/A',
      issues: [],
      codeLines: [],
      explanation: ''
    };
  }

  const text = raw.replace(/\r\n/g, '\n');


  const severitySection =
    text.match(/###\s*1\.\s*Severity Score[\s\S]*?(?=###\s*2\.)/i)?.[0] || '';

  const issuesSection =
    text.match(/###\s*2\.\s*Issues Identified[\s\S]*?(?=###\s*3\.)/i)?.[0] || '';

  const fixSection =
    text.match(/###\s*3\.\s*Suggested Fix[\s\S]*/i)?.[0] || '';



  let severity: number | null = null;

  const severityMatch =
    severitySection.match(/\((10|[1-9])\s*\/\s*10\)/) ||
    severitySection.match(/\b(10|[1-9])\s*\/\s*10\b/) ||
    severitySection.match(/\((10|[1-9])\)/) ||
    severitySection.match(/\b(10|[1-9])\b/);

  if (severityMatch) {
    severity = Number(severityMatch[1]);
  }


  const issues: string[] = [];

  issuesSection.split('\n').forEach(line => {

    const trimmed = line.trim();

    if (/^(\*|-|•|\d+\.)\s+/.test(trimmed)) {

      const clean = trimmed
        .replace(/^(\*|-|•|\d+\.)\s+/, '')
        .replace(/\*\*/g, '');

      issues.push(clean);

    }

  });


  const codeLines: string[] = [];

  let explanation = '';

  let insideCode = false;

  fixSection.split('\n').forEach(line => {

    if (line.trim().startsWith('```')) {
      insideCode = !insideCode;
      return;
    }

    if (insideCode)
      codeLines.push(line);
    else if (!line.startsWith('###'))
      explanation += line + '\n';

  });

  explanation = explanation.trim();


  return {

    severity,

    severityLabel: severity ? `${severity}/10` : 'N/A',

    issues,

    codeLines,

    explanation

  };

};