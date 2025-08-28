"use client"
import React from 'react'
import EventPage from '../../components/EventPage'

type Props = {
  params: {
    id: string
  }
}

const EventDetailPage = ({ params }: Props) => {
  return (
    <EventPage eventId={params.id} />
  )
}

export default EventDetailPage
