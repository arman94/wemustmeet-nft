import { useTitle } from "react-use"

const RouteWrapper = ({ route: { main: Main, title }, ...routeProps }) => {
  useTitle(`${title} | We Must Meet`)
  return (
    <>
      <Main {...routeProps} />
    </>
  )
}

export default RouteWrapper
