import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const LauncherList = (props) => {
  const [launchers, setLaunchers] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/launchers")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setLaunchers(body.launchers)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const launcherList = launchers.map((launcher) => {
    return <li key={launcher.id}>{launcher.name}</li>
  })

  return (
    <div>
      <ul>{launcherList}</ul>
      <Link to="/">Back to homepage</Link>
    </div>
  )
}

export default LauncherList
