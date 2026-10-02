export interface SiteConfig {
  seo: {
    title: string
    description: string
    url: string
    author: string
  }
  profile: {
    name: string
    bio: string
    image: string
  }
  socials: {
    name: string
    url: string
    icon: IconId
  }[]
  buttons: {
    name: string
    url: string
    icon: IconId
  }[]
}

// every id here must also exist as <symbol id> in public/sprite.svg,
// and be reference once in social or button above. All 3 must match
// or the icon render empty
export type IconId =
  | 'github'
  | 'codeberg'
  | 'telegram'
  | 'discord'
  | 'spotify'
  | 'mail'
  | 'garden'
  | 'kofi'
  | 'nanoo'
  | 'roblox'

export const siteConfig: SiteConfig = {
  seo: {
    title: 'Adnan Slamet Wibowo | Link in Bio',
    description: 'Adnan Slamet Wibowo is a dev & tech minimalist',
    url: 'https://nanoolabs.dev/nt',
    author: 'Adnan Slamet Wibowo',
  },
  profile: {
    name: '@aadnanmt',
    bio: 'A Minimalist Dev & Tech Nerd',
    image: '/img/me-act.webp',
  },
  socials: [
    { name: 'GitHub', url: 'https://github.com/aadnanmt', icon: 'github' },
    {
      name: 'Codeberg',
      url: 'https://codeberg.org/aadnanmt',
      icon: 'codeberg',
    },
    { name: 'Telegram', url: 'https://t.me/adnnmt', icon: 'telegram' },
    {
      name: 'Discord',
      url: 'https://discord.com/users/1155470881183760525',
      icon: 'discord',
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/user/314bjvthnpohaain54tchezpc4ji',
      icon: 'spotify',
    },
  ],
  buttons: [
    {
      name: 'Explore My Digital garden',
      url: 'https://root.nanoolabs.dev/explore',
      icon: 'garden',
    },
    {
      name: 'Check My Niri Dotfiles',
      url: 'https://github.com/aadnanmt/niri-dotfiles',
      icon: 'github',
    },
    {
      name: 'Nanoo Labs on Github',
      url: 'https://github.com/nanoolabs',
      icon: 'nanoo',
    },
    {
      name: 'Play Roblox With Me',
      url: 'https://www.roblox.com/share?code=79ca89d40350d64385b3b697582c5be3&type=Profile&source=ProfileShare&stamp=1790935992778',
      icon: 'roblox',
    },
    {
      name: 'Support Me on Ko-fi',
      url: 'https://ko-fi.com/aadnanmt',
      icon: 'kofi',
    },
    { name: 'Send an Email', url: 'mailto:adnan@nanoolabs.dev', icon: 'mail' },
  ],
}
