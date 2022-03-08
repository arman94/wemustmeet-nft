import logger from "redux-logger"
import { indexerMiddleware } from "new_redux/new_indexer/indexer-middleware"

const middleware = [indexerMiddleware]

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger)
}

export { middleware }
