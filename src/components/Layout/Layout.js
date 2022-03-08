import classNames from "classnames"
import { Header, Footer, Breadcrumb } from "components"
import classes from "./Layout.module.scss"

export const Layout = ({ children, className, breadcrumb }) => (
  <div className={classes.layout}>
    <div className={classes.container}>
      <Header />
      {breadcrumb && (
        <Breadcrumb paths={breadcrumb} className={classes.breadcrumb} />
      )}
      <main className={classNames(classes.main, className)}>{children}</main>
      <Footer />
    </div>
  </div>
)
