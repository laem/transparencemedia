import { useRouter } from "next/router"
import React from "react"
import Journal from "../../components/Journal"

function JournalPage() {
  const router = useRouter()
  const { id } = router.query

  return <Journal id={id} />
}

export default JournalPage
