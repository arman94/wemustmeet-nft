import { lazy } from "react"

export const ROUTES = [
  {
    path: "/access-code",
    title: "Home",
    main: lazy(() => import("new_pages/access-code")),
    authRequired: false,
  },
  {
    path: "/",
    title: "Home",
    main: lazy(() => import("new_pages/home")),
    authRequired: true,
  },
  {
    path: "/mint-nft/:index",
    title: "Minted NFT Details",
    main: lazy(() => import("new_pages/nft-viewer")),
    authRequired: true,
  },
  {
    path: "/nft/:index",
    title: "NFT Details",
    main: lazy(() => import("new_pages/nft-details")),
    authRequired: true,
  },
  {
    path: "/mint",
    title: "Create NFT",
    main: lazy(() => import("new_pages/create-nft")),
    authRequired: true,
  },
  {
    path: "/discover",
    title: "Explore Collections",
    main: lazy(() => import("new_pages/explore-collection")),
    authRequired: true,
  },
  {
    path: "/discover/:id",
    title: "Collection Details",
    main: lazy(() => import("new_pages/explore-collection-details")),
    authRequired: true,
  },
  {
    path: "/buy",
    title: "Buy NFTs",
    main: lazy(() => import("new_pages/explore-buy")),
    authRequired: true,
  },
  {
    path: "/buy/:id",
    title: "Application",
    main: lazy(() => import("new_pages/explore-buy-details")),
    authRequired: true,
  },
  {
    path: "/sell/:id?",
    title: "Sell NFT",
    main: lazy(() => import("new_pages/create-application")),
    authRequired: true,
  },
  {
    path: "/creators/:address",
    title: "Creators",
    main: lazy(() => import("new_pages/creator-details")),
    authRequired: true,
  },
  {
    path: "/faq",
    title: "FAQ",
    main: lazy(() => import("new_pages/faq")),
    authRequired: false,
  },
  {
    path: "/tutorial",
    title: "Tutorial",
    main: lazy(() => import("new_pages/tutorial")),
    authRequired: false,
  },
  {
    path: "/terms-of-service",
    title: "Terms & Conditions",
    main: lazy(() => import("new_pages/terms-conditions")),
    authRequired: false,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    main: lazy(() => import("new_pages/privacy-policy")),
    authRequired: true,
  },
  {
    path: "*",
    title: "Not Found",
    main: lazy(() => import("new_pages/not-found-page")),
    authRequired: false,
  },
  // {
  //   path: "*",
  //   title: "Coming Soon",
  //   main: lazy(() => import("new_pages/coming-soon")),
  //   authRequired: false,
  // },
]
