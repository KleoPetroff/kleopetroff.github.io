import React from 'react'
import { Social } from '../utils/socials'

const SocialLink: React.FunctionComponent<Social> = ({
  href,
  imageSrc,
  alt
}) => (
  <a rel="noopener noreferrer" href={href} target="_blank">
    <img src={imageSrc} alt={alt} />
  </a>
)

export default SocialLink
