import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

interface MetaProps {
  date: string
  timeToRead: number
}

const MetaWrapper = styled.div`
  color: #53585d;
  margin-top: 5px;
  font-size: 0.8em;
`

const Meta: React.FunctionComponent<MetaProps> = ({ date, timeToRead }) => (
  <MetaWrapper>
    <span>{dayjs(date).format('DD MMM YYYY')}</span>
    <span> • {timeToRead} min read</span>
  </MetaWrapper>
)

export default Meta
