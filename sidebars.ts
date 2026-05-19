import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gettingStarted: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/what-is-thinkengine',
        'getting-started/quick-start',
        'getting-started/authentication',
      ],
    },
  ],
  platform: [
    {
      type: 'category',
      label: 'Platform Guide',
      collapsed: false,
      items: [
        'platform/dashboard',
        'platform/soc',
        'platform/grc',
        'platform/code-security',
        'platform/incidents',
        'platform/mitre',
        'platform/billing',
        'platform/sofia-ai',
      ],
    },
  ],
  sentinel: [
    {
      type: 'category',
      label: 'Sentinel Agent',
      collapsed: false,
      items: [
        'sentinel/overview',
        'sentinel/installation',
        'sentinel/configuration',
        'sentinel/monitoring',
        'sentinel/investigate',
        'sentinel/security-scanning',
        'sentinel/remediation',
        'sentinel/fleet-mode',
        'sentinel/mcp-integration',
        'sentinel/attm',
        'sentinel/cli-reference',
        'sentinel/troubleshooting',
      ],
    },
  ],
  darius: [
    {
      type: 'category',
      label: 'Darius DAST',
      collapsed: false,
      items: [
        'darius/overview',
        'darius/installation',
        'darius/cli-reference',
        'darius/scan-profiles',
      ],
    },
  ],
  sleuthgraph: [
    {
      type: 'category',
      label: 'Sleuthgraph',
      collapsed: false,
      items: [
        'sleuthgraph/overview',
      ],
    },
  ],
  integrations: [
    {
      type: 'category',
      label: 'Source Control',
      collapsed: false,
      items: [
        'integrations/github',
      ],
    },
    {
      type: 'category',
      label: 'Alert Destinations',
      collapsed: false,
      items: [
        'integrations/slack',
        'integrations/discord',
        'integrations/teams',
        'integrations/email',
        'integrations/webhooks',
      ],
    },
    {
      type: 'category',
      label: 'Ticketing',
      collapsed: false,
      items: [
        'integrations/jira',
      ],
    },
    {
      type: 'category',
      label: 'Cloud Providers',
      collapsed: false,
      items: [
        'integrations/aws',
        'integrations/cloudflare',
      ],
    },
  ],
  downloads: [
    {
      type: 'category',
      label: 'Downloads',
      collapsed: false,
      items: [
        'downloads/sentinel-agent',
        'downloads/darius',
        'downloads/release-notes',
      ],
    },
  ],
  security: [
    {
      type: 'category',
      label: 'Security',
      collapsed: false,
      items: [
        'security',
      ],
    },
  ],
};

export default sidebars;
