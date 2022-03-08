import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { SessionWallet } from "algorand-session-wallet"
import classNames from "classnames"

import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice"
import { AlgorandConnectorWallet } from "components"
import { config } from "utils/config"
import { ReactComponent as MenuIcon } from "new_assets/icons/menu.svg"
import { ReactComponent as CloseIcon } from "new_assets/icons/close.svg"
import { ReactComponent as HeaderLogo } from "new_assets/logos/logo-default.svg"
import classes from "./Header.module.scss"

export const Header = () => {
  const location = useLocation()
  const navItems = [
    {
      label: "Discover",
      to: "/discover",
    },
    {
      label: "Buy",
      to: "/buy?type=live",
    },
    {
      label: "Sell",
      to: "/sell",
    },
    {
      label: "Mint",
      to: "/mint",
    },
  ]

  const dispatch = useDispatch()
  const sw = new SessionWallet(config.network)

  const [connected, setConnected] = useState(sw.connected())
  const [isAsideMenuOpen, setIsAsideMenuOpen] = useState(false)

  const { sessionWallet, accts } = useSelector((state) => state.wallet)
  const { authenticated } = useSelector((state) => state.accessCode)

  useEffect(() => {
    setConnected(connected)
  }, [connected])

  useEffect(() => {
    setConnected(sessionWallet.connected())
  }, [sessionWallet])

  useEffect(() => {
    // remove scroll from page when sidebar is open
    const html = document.querySelector("html")

    if (isAsideMenuOpen) {
      html.style.overflow = "hidden"
    } else {
      html.style.overflow = "auto"
    }
  }, [isAsideMenuOpen])

  const updateWallet = (swk) => {
    dispatch(setSessionWallet(swk))
    dispatch(setAccounts(swk.accountList()))
    dispatch(setConnectedStatus(swk.connected()))
    setConnected(swk.connected())
  }

  const isActiveNavItem = (label) => {
    const pathName = location.pathname.split("/")[1]
    if (pathName === "discover" && label === "Discover") {
      return true
    }
    if (pathName === "buy" && label === "Buy") {
      return true
    }
    if (pathName === "sell" && label === "Sell") {
      return true
    }

    if (pathName === "mint" && label === "Mint") {
      return true
    }
    return false
  }

  if (!authenticated) {
    return (
      <header className={classes["header-container"]}>
        <div className={classes.header}>
          <Link to="/" className={classes.logo}>
            <HeaderLogo />
          </Link>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className={classes["header-container"]}>
        <div className={classes.header}>
          <Link to="/" className={classes.logo}>
            <HeaderLogo />
          </Link>

          <nav className={classes.nav}>
            {navItems.map((item, index) => (
              <Link
                to={item.to}
                key={index}
                className={classNames(
                  classes["nav-item"],
                  isActiveNavItem(item.label) && classes["nav-active"]
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={classes.actions}>
            <AlgorandConnectorWallet
              darkMode={false}
              sessionWallet={sessionWallet}
              accts={accts}
              connected={connected}
              updateWallet={updateWallet}
            />

            <button
              className={classNames(classes.action, classes["mobile-menu"])}
              type="button"
              onClick={() => setIsAsideMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <aside
          className={classNames(
            classes.aside,
            isAsideMenuOpen && classes["aside--open"]
          )}
        >
          <div className={classes.aside__header}>
            <button type="button" onClick={() => setIsAsideMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className={classes.aside__content}>
            <nav className={classes.aside__nav}>
              {navItems.map((item) => (
                <Link
                  to={item.to}
                  key={item.label}
                  className={classNames(
                    classes["aside__nav-item"],
                    isActiveNavItem(item.label) && classes["nav-active"]
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </header>
    </>
  )
}
