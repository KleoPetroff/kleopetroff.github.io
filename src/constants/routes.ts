export interface Route {
  url: string
  name: string
  external?: boolean
}

export const routes: Route[] = [
  { url: '/', name: 'Home' },
  { url: '/about', name: 'About' },
  {
    url: 'https://projects.kleopetrov.me/',
    name: 'Projects',
    external: true
  }
]
