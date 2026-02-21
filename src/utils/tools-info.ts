import { Bug, Code2, Terminal } from "lucide-react";

export const TOOLS_INFO = [
    {
        id: 'generator',
        title: 'Logic Generator',
        desc: 'Convert natural language requirements into production-ready boilerplate and complex functions.',
        icon: Terminal,
        color: 'blue',
        path: '/tools/generate',
        tags: ['TypeScript', 'Python', 'Go']
    },
    {
        id: 'explainer',
        title: 'Code Explainer',
        desc: 'Paste legacy code or complex snippets to get a step-by-step breakdown of the underlying logic.',
        icon: Code2,
        color: 'red',
        path: '/tools/explain',
        tags: ['Documentation', 'Learning']
    },
    {
        id: 'bug-report',
        title: 'Bug Architect',
        desc: 'Identify logical flaws and generate detailed, professional bug reports ready for PDF export.',
        text: 'text-emerald-500',
        icon: Bug,
        color: 'emerald',
        path: '/tools/report',
        tags: ['Debugging', 'Quality Assurance']
    }
]