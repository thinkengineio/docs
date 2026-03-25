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
        'platform/tasks',
        'platform/soc',
        'platform/grc',
        'platform/code-security',
        'platform/incidents',
        'platform/mitre',
        'platform/billing',
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
  api: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/authentication',
        'api/rate-limits',
        'api/errors',
        'api/tasks',
        'api/sentinel',
        'api/grc',
        'api/security-analytics',
        'api/soc',
        'api/code-security',
        'api/incidents',
        'api/mitre',
        'api/endpoints',
        'api/prompts-skills',
        'api/memory',
        'api/billing',
        'api/user',
      ],
    },
  ],
  integrations: [
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/github',
        'integrations/slack',
        'integrations/webhooks',
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
        'downloads/release-notes',
      ],
    },
  ],
};

export default sidebars;
