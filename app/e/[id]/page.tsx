import React from 'react'
import EventPage from '../../components/EventPage'

type Props = {
  params: Promise<{
    id: string
  }>
}

const EventDetailPage = async ({ params }: Props) => {
  const { id } = await params
  return (
    <EventPage eventId={id} />
  )
}

export default EventDetailPage
