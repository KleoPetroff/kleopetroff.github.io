export interface Route {
  url: string
  name: string
}

export const routes: Route[] = [
  { url: '/', name: 'Home' },
  { url: '/about', name: 'About' },
  { url: '/archive', name: 'Archive' }
]
