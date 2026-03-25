import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ThinkEngine Docs',
  tagline: 'AI-native security monitoring and autonomous agent platform',
  favicon: 'img/logo.png',
  url: 'https://docs.thinkengine.io',
  baseUrl: '/',
  organizationName: 'thinkengineio',
  projectName: 'docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ThinkEngine',
      logo: {
        alt: 'ThinkEngine Logo',
        src: 'img/logo.png',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'gettingStarted', position: 'left', label: 'Getting Started'},
        {type: 'docSidebar', sidebarId: 'platform', position: 'left', label: 'Platform'},
        {type: 'docSidebar', sidebarId: 'sentinel', position: 'left', label: 'Sentinel'},
        {type: 'docSidebar', sidebarId: 'api', position: 'left', label: 'API'},
        {type: 'docSidebar', sidebarId: 'integrations', position: 'left', label: 'Integrations'},
        {type: 'docSidebar', sidebarId: 'downloads', position: 'left', label: 'Downloads'},
        {href: 'https://thinkengine.io', label: 'ThinkEngine', position: 'right'},
        {href: 'https://github.com/thinkengineio', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/getting-started/what-is-thinkengine'},
            {label: 'Sentinel Agent', to: '/sentinel/overview'},
            {label: 'API Reference', to: '/api/authentication'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'ThinkEngine', href: 'https://thinkengine.io'},
            {label: 'GitHub', href: 'https://github.com/thinkengineio'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy Policy', href: 'https://thinkengine.io/privacy'},
            {label: 'Terms of Service', href: 'https://thinkengine.io/terms'},
          ],
        },
      ],
      copyright: `Copyright \u00a9 ${new Date().getFullYear()} ThinkEngine. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'python', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
