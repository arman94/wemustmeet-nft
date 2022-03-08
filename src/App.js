import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import * as am4core from "@amcharts/amcharts4/core"
// eslint-disable-next-line camelcase
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
// eslint-disable-next-line camelcase
import am4themes_dark from "@amcharts/amcharts4/themes/dark"

import Home from "pages/home"
import AllCollections from "pages/all-collections"
import CollectionDetails from "pages/collection-details"
import Asset from "pages/asset"
import Mint from "pages/mint"
import NFTViewer from "pages/nft-viewer"
import CreateAuction from "pages/create-auction"
import AllAuctions from "./pages/all-auctions"
import AuctionViewer from "./pages/auction-viewer"
import Creator from "pages/creator"
import CreatorDetails from "pages/creator-details"
import { Layout } from "new_components"
import RouteWrapper from "./new_components/RouteWrapper"
import { ROUTES } from "./routings"
import { LoadingIndicator } from "./components"

am4core.useTheme(am4themes_animated)
am4core.useTheme(am4themes_dark)

function App() {
  const { authenticated } = useSelector((state) => state.accessCode)
  const { authChecking } = useSelector((state) => state.accessCode)

  if (authChecking) {
    return <></>
  }

  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <Layout>
            <LoadingIndicator />
          </Layout>
        }
      >
        <Switch>
          <Route path="/v1/home" exact component={Home} />
          <Route path="/v1/all-collections" exact component={AllCollections} />
          <Route
            path="/v1/collection/:id"
            exact
            component={CollectionDetails}
          />
          <Route path="/v1/asset/:id" exact component={Asset} />
          <Route path="/v1/nft/:assetId" exact component={NFTViewer} />
          <Route
            path="/v1/application/:appId"
            exact
            component={AuctionViewer}
          />
          <Route path="/v1/mint" exact component={Mint} />
          <Route
            path="/v1/create-application"
            exact
            component={CreateAuction}
          />
          <Route path="/v1/all-applications" exact component={AllAuctions} />
          <Route path="/v1/creators" exact component={Creator} />
          <Route path="/v1/creators/:addr" exact component={CreatorDetails} />
          {/* ٔNew routes */}
          {ROUTES.map((route) => {
            if (route.authRequired && !authenticated) {
              return (
                <Route
                  key={route.title}
                  path={route.path}
                  exact
                  render={() => <Redirect to="/access-code" />}
                />
              )
            } else {
              return (
                <Route
                  key={route.title}
                  path={route.path}
                  exact
                  render={(props) => <RouteWrapper route={route} {...props} />}
                />
              )
            }
          })}
          {/* Old design coming soon */}
          {/* <Route path="*" exact component={ComingSoon} /> */}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
