import {
  Page,
  Text,
  View,
  Document
} from '@react-pdf/renderer';

import { reportStyles } from './report.styles';
import { parseReportContent } from './report.parser';
import { getSeverityColor } from './report.utils';
import { renderMarkdownText } from './report.markdown';

interface Props {
  content: string;
}

export const ReportPDF = ({ content }: Props) => {

  const parsed = parseReportContent(content);

  return (

    <Document>

      <Page size="A4" style={reportStyles.page} wrap>

        <View style={reportStyles.header}>
          <Text style={reportStyles.title}>
            AI Security Report
          </Text>
        </View>

        {/* Severity */}

        <View style={reportStyles.section}>

          <Text style={reportStyles.sectionHeader}>
            Severity Score
          </Text>

          <Text
            style={{
              ...reportStyles.severityValue,
              color: getSeverityColor(parsed.severity)
            }}
          >
            {parsed.severityLabel}
          </Text>

        </View>

        {/* Issues */}

        <View style={reportStyles.section}>

          <Text style={reportStyles.sectionHeader}>
            Issues Identified
          </Text>

          {parsed.issues.length === 0 && (
            <Text>No issues found</Text>
          )}

          {parsed.issues.map((issue, i) => (

            <View key={i} style={reportStyles.issueRow} wrap={false}>

              <Text style={reportStyles.bullet}>•</Text>

              <Text style={reportStyles.issueText}>
                {renderMarkdownText(issue, reportStyles.issueText)}
              </Text>

            </View>

          ))}

        </View>

        {/* Fix */}

        <View style={reportStyles.section}>

          <Text style={reportStyles.sectionHeader}>
            Suggested Fix
          </Text>

          {parsed.codeLines.length > 0 && (

            <View style={reportStyles.codeContainer}>

              {parsed.codeLines.map((line, i) => (

                <Text key={i} style={reportStyles.codeLine}>
                  {line}
                </Text>

              ))}

            </View>

          )}

          {parsed.explanation && (

            <Text style={reportStyles.explanation}>
              {renderMarkdownText(parsed.explanation, reportStyles.explanation)}
            </Text>

          )}

        </View>

      </Page>

    </Document>

  );

};