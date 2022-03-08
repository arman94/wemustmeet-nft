import { Button } from "new_components"
import classes from "./Footer.module.scss"
import { ReactComponent as GroundShape } from "new_assets/shapes/ground.svg"
import { ReactComponent as CircleShape } from "new_assets/shapes/circle.svg"
import { useHistory, Link } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"
import { ReactComponent as HeaderLogo } from "new_assets/logos/logo-default.svg"

const navItems = [
  {
    label: "Terms of Service",
    to: "/terms-of-service",
  },
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    label: "FAQ",
    to: "/faq",
  },
  {
    label: "Tutorial",
    to: "/tutorial",
  },
  // {
  //   label: "Telegram",
  //   to: "https://t.me/+plozo6izmX8zNzI9",
  //   external: true,
  // },
  {
    label: "Contact",
    to: "mailto:matt@og2d.com",
    external: true,
  },
]

export const Footer = () => {
  const history = useHistory()

  const exploreCollections = () => {
    // history.push(`/discover`)
    history.push(`/buy?type=live`)
    scroll.scrollToTop()
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          <HeaderLogo />
        </Link>
        <p className={classes.desc}>
          Buy, Sell and Trade NFTs on the Carbon Negative NFT Marketplace
          Powered by OG2D
        </p>

        <Button onClick={exploreCollections}>Explore Market</Button>

        <nav className={classes.nav}>
          {navItems.map((item, index) =>
            item.external ? (
              <a key={index} href={item.to} className={classes["nav-item"]}>
                {item.label}
              </a>
            ) : (
              <Link key={index} to={item.to} className={classes["nav-item"]}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* <span className={classes.copyright}>
        Sabregen Explorer 2021, All right received
      </span> */}
      </div>

      <CircleShape className={classes["circle-svg"]} />
      <div className={classes["ground-svg"]}>
        <div />
        <GroundShape />
      </div>
    </footer>
  )
}
