export const isDevelopment = process.env.NODE_ENV === "development"

export const LOADING_STATUS = {
  IDLE: -1,
  PENDING: 0,
  COMPLETED: 1,
}

export const AUCTION_TIMES = [
  {
    label: "1 Hour",
    value: 3600,
  },
  {
    label: "6 Hours",
    value: 3600 * 6,
  },
  {
    label: "12 Hours",
    value: 3600 * 12,
  },
  {
    label: "1 Day",
    value: 3600 * 24,
  },
  {
    label: "2 Days",
    value: 3600 * (24 * 2),
  },
  {
    label: "4 Days",
    value: 3600 * (24 * 4),
  },
  {
    label: "Custom",
    value: "custom",
  },
]

export const metadataFormatTypes = [
  {
    label: "ARC3",
    value: "arc3",
  },
  {
    label: "ARC69",
    value: "arc69",
  },
]

export const buyTypes = {
  LIVE_AUCTION: "LIVE_AUCTION",
  CLOSED_AUCTION: "CLOSED_AUCTION",
  DELETED_AUCTION: "DELETED_AUCTION",
  BUY_NOW: "BUY_NOW",
  SOLD: "SOLD",
}

export const SellTypes = {
  FIXED_PRICE: "FIXED_PRICE",
  AUCTION: "AUCTION",
}

export const creatorFilterTypes = {
  created: "Created",
  owned: "Owned",
  optIns: "Opt Ins",
  myBids: "My Bids",
  myListings: "My Listings",
}

export const FilterTypes = {
  live: "LIVE_AUCTION",
  buy: "BUY_NOW",
  closed: "CLOSED_AUCTION",
  sold: "SOLD",
  LIVE_AUCTION: "live",
  BUY_NOW: "buy",
  SOLD: "sold",
  CLOSED_AUCTION: "closed",
}

export const SortOptions = [
  { title: "Date Listed: Newest", value: 1 },
  { title: "Price: Highest", value: 2 },
  { title: "Price: Lowest", value: 3 },
  { title: "Ending: Soonest", value: 4 },
]

export const PROGRESS_STEPS = {
  // 0
  INITIAL: {
    status: 0,
    note: "",
  },
  // 1
  CONNECT_WALLET: {
    status: 2,
    note: "Connecting wallet...",
  },
  // 2
  BALANCE_CHECK: {
    status: 10,
    note: "Checking balance...",
  },
  // 3
  CREATE_SALES_ACCOUNT: {
    status: 16,
    note: "Creating sales account...",
  },
  // 4
  MINIMAL_BALANCE_TRANSFER: {
    status: 22,
    note: "Transferring minimum balance...",
  },
  // 5
  OPT_IN: {
    status: 35,
    note: "Opt-in to receive asset...",
  },
  // 6
  ASSET_TRANSFER: {
    status: 50,
    note: "Transferring asset to contract account...",
  },
  // 7
  VERIFY_CONTRACT: {
    status: 65,
    note: "Verifying contract...",
  },
  // 8
  REDIRECT: {
    status: 97,
    note: "Redirecting...",
  },
}

export const BID_PROGRESS_STEPS = {
  // 0
  INITIAL: {
    status: 0,
    note: "",
  },
  // 1
  CONNECT_WALLET: {
    status: 20,
    note: "Connecting wallet...",
  },
  // 2
  OPTIN_APPLICATION: {
    status: 40,
    note: "Opt-in Application...",
  },
  // 3
  BALANCE_CHECK: {
    status: 60,
    note: "Checking balance...",
  },
  // 3
  CLOSE_CONTRACT: {
    status: 60,
    note: "Closing contract...",
  },
  // 4
  BIDDING: {
    status: 80,
    note: "Bidding...",
  },
  // 4
  BUYING: {
    status: 80,
    note: "Buying...",
  },
  // 5
  BID_CONFIRM: {
    status: 90,
    note: "Waiting for bid to be confirmed on the blockchain...",
  },
  // 5
  CLOSE_CONFIRM: {
    status: 90,
    note: "Waiting for close auction to be confirmed on the blockchain...",
  },
  // 5
  CLOSE_BUYNOW: {
    status: 90,
    note: "Waiting for close Fixed Sale to be confirmed on the blockchain...",
  },
}

export const MINIMUM_BALANCE_APPLICATION = 0.658
