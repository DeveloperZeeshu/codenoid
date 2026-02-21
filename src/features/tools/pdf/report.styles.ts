import { StyleSheet } from '@react-pdf/renderer';

export const reportStyles = StyleSheet.create({

  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica'
  },

  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 12
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  section: {
    marginBottom: 20
  },

  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    backgroundColor: '#f1f5f9',
    padding: 8,
    marginBottom: 10
  },

  severityValue: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  issueRow: {
    flexDirection: 'row',
    marginBottom: 6
  },

  bullet: {
    width: 12
  },

  issueText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.5
  },

  codeContainer: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 4
  },

  codeLine: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: '#38bdf8'
  },

  explanation: {
    fontSize: 10.5,
    marginTop: 10,
    lineHeight: 1.5
  }

});