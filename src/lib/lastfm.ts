import { getSecret } from 'astro:env/server'

export type LastFMTrack = {
  name: string
  artist: string
  url: string
  image: string
  nowPlaying: boolean
  timestamp?: number
}

export type NowPlayingResponse = {
  track: LastFMTrack | null
  error?: string
}

// module-level cache: SSR isolate reuse it across requests, TTL 60s
// keeps last.fm rate usage sane without a KV store
let cache: NowPlayingResponse | null = null
let lastFetch = 0
const TTL = 60000

export async function getNowPlaying(): Promise<NowPlayingResponse> {
  const now = Date.now()
  if (cache && now - lastFetch < TTL) return cache

  // getSecret: adapter reads CF env binding at runtime, falls back to
  // process.env (.env file) in dev/build.
  // bare process.env is empty
  // shim inside the worker → always undefined
  const apiKey = getSecret('LASTFM_API_KEY')
  const username = getSecret('LASTFM_USERNAME')

  if (!apiKey || !username)
    return { track: null, error: 'Missing last.fm config.' }

  try {
    const params = new URLSearchParams({
      method: 'user.getrecenttracks',
      user: username,
      api_key: apiKey,
      format: 'json',
      limit: '1',
    })

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
      { signal: AbortSignal.timeout(5000) },
    )

    if (!response.ok)
      throw new Error(`Last.fm API error: ${response.statusText}`)

    const data = await response.json()
    const trackData = data.recenttracks?.track?.[0]

    if (!trackData) {
      cache = { track: null }
      lastFetch = now
      return cache
    }

    const track: LastFMTrack = {
      name: trackData.name,
      artist: trackData.artist['#text'],
      url: trackData.url,
      // Last.fm returns multiple image sizes. Pick "large" for
      // consistent card sizing. NowPlaying checks track.image
      // before rendering <img>.
      image:
        trackData.image.find(
          (img: Record<string, string>) => img.size === 'large',
        )?.['#text'] || '',
      // Last.fm sends @attr.nowplaying as string "true", not boolean.
      // Strict === prevents truthy coercion of "false" → true
      nowPlaying: trackData['@attr']?.nowplaying === 'true',
      timestamp: trackData.date ? parseInt(trackData.date.uts) : undefined,
    }

    cache = { track }
    lastFetch = now
    return cache
  } catch (error) {
    console.error('Error fetching Now Playing from Last.fm:', error)
    lastFetch = now
    // stale cache beats a broken widget
    return cache || { track: null, error: 'Failed to fetch music data.' }
  }
}
