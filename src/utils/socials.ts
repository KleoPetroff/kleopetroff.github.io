import github from '../images/icons/github.png'
import linkedin from '../images/icons/linkedin.png'
import twitter from '../images/icons/twitter.png'

export interface Social {
  href: string
  imageSrc: any
  alt: string
}

export const socials: Social[] = [
  {
    href: 'http://github.com/Kleopetroff',
    imageSrc: github,
    alt: 'Github Icon'
  },
  {
    href: 'https://bg.linkedin.com/in/kliment-petrov-957735a4',
    imageSrc: linkedin,
    alt: 'LinkedIn Icon'
  },
  {
    href: 'http://twitter.com/Kleopetroff',
    imageSrc: twitter,
    alt: 'Twitter Icon'
  }
]
