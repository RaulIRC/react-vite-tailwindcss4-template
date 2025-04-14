import { createFileRoute } from '@tanstack/react-router'
import firebaseLogo from '../assets/firebase-brand-assets/Firebase Logo & Product Icons  2/Firebase Logo/Primary Logomark/SVG/Logomark_Full Color.svg'
import { useState } from 'react'
import HomeComponent from '../pages/Home'

// This is the root index for the website.

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  /* JSX Code goes here */
  return (
    <>
      <HomeComponent />
    </>
  )
}

export default Route;