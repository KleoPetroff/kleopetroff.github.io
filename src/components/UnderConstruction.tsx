import * as React from 'react'
import underConstruction from '../images/under_construction.svg'
import styled from 'styled-components'

const UnderConstructionImage = styled.img`
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h1`
  margin-bottom: 50px;
`

const UnderConstruction = () => (
  <Wrapper>
    <Heading>🚧 Under Construction 🚧</Heading>
    <UnderConstructionImage src={underConstruction} alt="Under Construction" />
  </Wrapper>
)

export default UnderConstruction
