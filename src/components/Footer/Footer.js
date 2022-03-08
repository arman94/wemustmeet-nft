import classes from "./Footer.module.scss"

export const Footer = () => (
  <footer className={classes.footer}>
    We Must Meet {new Date().getFullYear()}, All right received
  </footer>
)
