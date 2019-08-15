import React from 'react'
import styled from 'styled-components'
import SocialLink from './SocialLink'
import { socials } from '../constants/socials'

const FooterWrapper = styled.footer`
  flex-shrink: 0;
  max-width: 640px;
  margin: 0 auto 15px;
  justify-content: center;
`

const Title = styled.h4`
  margin: 15px 0;
`

const Social = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Love = styled.span`
  color: #ce4345;
`

const Footer: React.FunctionComponent = () => (
  <FooterWrapper>
    <Title>
      Made with <Love>❤</Love> by Kliment Petrov
    </Title>
    <Social>
      {socials.map(({ href, imageSrc, alt }, index) => (
        <SocialLink
          key={`${alt}_${index}`}
          href={href}
          imageSrc={imageSrc}
          alt={alt}
        />
      ))}
    </Social>
  </FooterWrapper>
)

export default Footer
