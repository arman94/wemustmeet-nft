/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import classNames from "classnames"
import { SessionWallet } from "algorand-session-wallet"
import {
  TextField,
  NumberField,
  Textarea,
  Button,
  ImagePicker,
  AlertModal,
  SelectDropdown,
} from "new_components"
import { metadataFormatTypes } from "utils/constants"
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice"
import { putToPinata } from "utils/ipfs"
import { imageIntegrity, NFT, NFTMetadata, ARC69Metadata } from "utils/nft"
import { ReactComponent as PlusIcon } from "new_assets/icons/plus-circle.svg"
import classes from "./Form.module.scss"

export const Form = (props) => {
  const { className, sw, connected } = props
  const dispatch = useDispatch()
  const history = useHistory()

  const initErrors = {
    image: {
      status: false,
      message: "",
    },
    name: {
      status: false,
      message: "",
    },
    unitName: {
      status: false,
      message: "",
    },
    royalty: {
      status: false,
      message: "",
    },
    decimal: {
      status: false,
      message: "",
    },
    description: {
      status: false,
      message: "",
    },
    mints: [],
  }

  const [meta, setMeta] = useState(new NFTMetadata())
  const [arc69Meta, setArc69Meta] = useState(new ARC69Metadata())
  const [loading, setLoading] = useState(false)
  const [fileObj, setFileObj] = useState()
  const [nameVal, setName] = useState("")
  const [unitName, setUnitName] = useState("")
  const [metadataFormat, setMetadataFormat] = useState("")

  const [progress, setProgress] = useState({
    status: 0,
    note: "",
  })
  const [mints, setMints] = useState([])
  const [errors, setErrors] = useState(initErrors)

  const initInfoDialog = {
    isOpen: false,
    data: { title: "", desc: "" },
  }

  const [infoDialog, setInfoDialog] = useState(initInfoDialog)
  const [decimal, setDecimal] = useState(1)

  useEffect(() => {
    setMetadataFormat("arc3")
  }, [])
  const handleNumberChange = (e) => {
    setDecimal(e.target.value)
  }

  const createRandomId = () => {
    const id = Math.random()
    if (mints.some((mint) => mint.id === id)) {
      createRandomId()
    } else {
      return id
    }
  }

  const handleAddMint = () => {
    const existingMints = [...mints]
    existingMints.push({
      id: createRandomId(),
      name: "",
      value: "",
    })

    setMints(existingMints)
  }

  const handleRemoveMint = (id) => {
    // find target mint
    const existingMints = [...mints]
    const targetId = existingMints.findIndex((m) => m.id === id)

    if (targetId !== -1) {
      // remove mint
      existingMints.splice(targetId, 1)
      setMints(existingMints)
    }
  }

  const handleOnChangeMintInput = ({ event, type, id }) => {
    const existingMints = [...mints]
    // find target input
    const targetIndex = existingMints.findIndex((mint) => mint.id === id)

    if (targetIndex !== -1) {
      // update value
      if (type === "name") {
        existingMints[targetIndex].name = event.target.value
      } else if (type === "value") {
        existingMints[targetIndex].value = event.target.value
      }
    }

    setMints(existingMints)
  }

  const handleValidateForm = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    let formValues = {}
    if (metadataFormat === "arc3") {
      formValues = {
        image: fileObj,
        metadata: meta,
        name: elements.name.value.trim(),
        unitName: elements.unitName.value.trim(),
        royalty: elements.royalty.value.trim()
          ? Number(elements.royalty.value.trim())
          : undefined,
        decimal: elements.decimal.value.trim()
          ? Number(elements.decimal.value.trim())
          : undefined,
        description: elements.description.value.trim(),
      }
    } else if (metadataFormat === "arc69") {
      formValues = {
        image: fileObj,
        metadata: arc69Meta,
        name: elements.name.value.trim(),
        unitName: elements.unitName.value.trim(),
        royalty: elements.royalty.value.trim()
          ? Number(elements.royalty.value.trim())
          : undefined,
        decimal: elements.decimal.value.trim()
          ? Number(elements.decimal.value.trim())
          : undefined,
        description: elements.description.value.trim(),
      }
    }

    const errorsObj = { ...initErrors }

    // image
    if (!formValues.image) {
      errorsObj.image = {
        status: true,
        message: "Please select an image.",
      }
    }
    // name
    if (formValues.name.length < 3 || formValues.name.length >= 32) {
      if (formValues.name.length < 3) {
        errorsObj.name = {
          status: true,
          message: "The NFT name must be more than 2 characters.",
        }
      } else if (formValues.name.length > 3 && formValues.name.length >= 32) {
        errorsObj.name = {
          status: true,
          message: "The NFT name must be less than 32 characters.",
        }
      }
    }
    // unit name
    if (formValues.unitName.length < 3 || formValues.unitName.length >= 8) {
      if (formValues.unitName.length < 3) {
        errorsObj.unitName = {
          status: true,
          message: "Unit name must be more than 2 characters.",
        }
      } else if (
        formValues.unitName.length > 3 &&
        formValues.unitName.length >= 8
      ) {
        errorsObj.unitName = {
          status: true,
          message: "Unit name must be less than 8 characters.",
        }
      }
    }
    // royalty
    // eslint-disable-next-line no-restricted-globals
    if (formValues.royalty <= 0) {
      errorsObj.royalty = {
        status: true,
        message: "Royalty must be bigger than 0%.",
      }
    }
    if (formValues.royalty >= 90) {
      errorsObj.royalty = {
        status: true,
        message: "Royalty must be smller than 90%.",
      }
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(formValues.decimal)) {
      errorsObj.decimal = {
        status: true,
        message: "Quantity must be a number.",
      }
    }
    // description
    if (formValues.description.length < 3) {
      errorsObj.description = {
        status: true,
        message: "Description must be more than 2 characters.",
      }
    }

    // check for mint validations
    mints.forEach((mint) => {
      const isNameNotValid = !!(
        !mint.name.trim() && mint.name.trim().length < 3
      )
      const isValueNotValid = !!(
        !mint.value.trim() && mint.value.trim().length < 3
      )

      if (isNameNotValid || isValueNotValid) {
        errorsObj.mints.push({
          id: mint.id,
          name: isNameNotValid,
          value: isValueNotValid,
        })
      }
    })

    console.log(errorsObj)

    setErrors(errorsObj)

    const isAllFormValuesValid = Object.values(errorsObj).every((field) => {
      if (Array.isArray(field)) {
        return field.length === 0
      }
      return !field.status
    })

    console.log(formValues)

    if (isAllFormValuesValid) {
      // all fields are valid
      mintNft({ ...formValues, mints })
    }
  }

  const captureMetadata = (values) => {
    const eprops = values.mints.reduce(
      (all, ep) => ({ ...all, [ep.name]: ep.value }),
      {}
    )
    if (metadataFormat === "arc3") {
      return new NFTMetadata({
        name: values.name,
        unitName: values.unitName,
        description: values.description,
        image_mimetype: values.image.type,
        royalty: values.royalty,
        // decimals: values.decimal,
        total: values.decimal,
        properties: { ...eprops, ...meta.properties },
      })
    } else if (metadataFormat === "arc69") {
      return new ARC69Metadata({
        standard: "arc69",
        name: values.name,
        unitName: values.unitName,
        description: values.description,
        image_mimetype: values.image.type,
        royalty: values.royalty,
        // decimals: values.decimal,
        total: values.decimal,
        properties: { ...eprops, ...arc69Meta.properties },
      })
    }
  }

  const mintNft = async (values) => {
    setLoading(true)
    setProgress({
      status: 10,
      note: "Starting mint...",
    })
    const md = captureMetadata(values)
    md.image_integrity = await imageIntegrity(fileObj)
    setProgress({
      status: 30,
      note: "Calculating integrity...",
    })
    if (metadataFormat === "arc3") {
      setMeta(md)
    } else if (metadataFormat === "arc69") {
      setArc69Meta(md)
    }

    const cid = await putToPinata(fileObj, md, setProgress)
    if (cid) {
      setProgress({
        status: 50,
        note: "Caching IPFS CID...",
      })
      try {
        const nft = await NFT.create(
          sw.wallet,
          md,
          cid,
          setProgress,
          metadataFormat
        )
        setLoading(false)
        handleSetNFT(nft)
      } catch (err) {
        if (connected) {
          if (JSON.stringify(err).includes("PopupOpenError")) {
            handleShowInfoDialog({
              title: "Wallet Popup Blocked",
              desc: "Your browser has blocked popups. Please allow popups to create an NFT.",
            })
          } else {
            let description = `Failed to create nft: ${err}.`
            if (description.includes("t:")) {
              description = description.replace("t:", "")
            } else if (description.includes("TypeError:")) {
              description = description.replace("TypeError:", "")
            }
            handleShowInfoDialog({
              title: "Unexpected Error",
              desc: description,
            })
          }
        } else {
          handleShowInfoDialog({
            title: "Connect a wallet",
            desc: "Please connect a wallet",
          })
        }
        setProgress({
          status: 0,
          note: "",
        })
        setLoading(false)
      }
    } else {
      setLoading(false)
      setProgress({
        status: 0,
        note: "",
      })
    }
  }

  const isMintInputHasError = (mintId, type) => {
    const existingMintErrors = [...errors.mints]

    // find target input
    const targetIndex = existingMintErrors.findIndex(
      (mint) => mint.id === mintId
    )

    if (targetIndex !== -1) {
      if (type === "name" && existingMintErrors[targetIndex].name) {
        return "Mint name is required"
      } else if (type === "value" && existingMintErrors[targetIndex].value) {
        return "Mint value is required"
      }
    }

    return false
  }

  const setFile = (file) => {
    setFileObj(file)

    if (file) {
      if (metadataFormat === "arc3") {
        setMeta(
          (meta) =>
            new NFTMetadata({
              ...meta,
              image: file.name,
              image_mimetype: file.type,
              properties: { ...meta.properties, size: file.size },
            })
        )
      } else if (metadataFormat === "arc69") {
        setArc69Meta(
          (arc69Meta) =>
            new ARC69Metadata({
              ...arc69Meta,
              image: file.name,
              image_mimetype: file.type,
              properties: { ...arc69Meta.properties, size: file.size },
            })
        )
      }
    }
  }
  const handleShowInfoDialog = ({ title, desc }) => {
    setInfoDialog({ isOpen: true, data: { title, desc } })
  }

  const handleCloseInfoModal = () => {
    setInfoDialog(initInfoDialog)
  }

  const handleSetNFT = (nft) => {
    history.push(`/mint-nft/${nft.token.id}`)
  }

  const handleConnect = async () => {
    try {
      const wallet = new SessionWallet(
        sw.network,
        sw.permissionCallback,
        "my-algo-connect"
      )
      const res = await wallet.connect()
      if (res) {
        dispatch(setSessionWallet(wallet))
        dispatch(setAccounts(wallet.accountList()))
        dispatch(setConnectedStatus(wallet.connected()))
      } else {
        handleShowInfoDialog({
          title: "Wallet Connection Failed",
          desc: "Please try it again.",
        })
      }
    } catch (error) {
      handleShowInfoDialog({
        title: "Wallet Connection Failed",
        desc: "Please try it again.",
      })
    }
  }

  return (
    <>
      <AlertModal
        isOpen={infoDialog.isOpen}
        data={infoDialog.data}
        onClose={handleCloseInfoModal}
      />
      {connected ? (
        <form
          className={classNames(classes.container, className)}
          onSubmit={handleValidateForm}
        >
          <div className={classes.left}>
            <h1 className={classes.title}> Mint NFT </h1>
            <span className={classes.subtitle}>
              Image, video, audio or 3D model.
            </span>
            <span className={classes.info}>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              GLB, GLTF. Max size: 40MB.
            </span>

            <div className={classes.left__inputs}>
              <TextField
                label="Name"
                required
                name="name"
                onChange={(e) => setName(e.target.value)}
                error={errors.name.status && errors.name.message}
                tooltipText="NFT name must be 32 characters or less."
                disabled={loading}
              />
              <TextField
                label="Unit name"
                required
                onChange={(e) => setUnitName(e.target.value)}
                name="unitName"
                error={errors.unitName.status && errors.unitName.message}
                tooltipText="Unit name must be 8 characters or less."
                disabled={loading}
              />
              <NumberField
                label="Quantity"
                type="number"
                name="decimal"
                min="1"
                max="10000"
                value={decimal}
                onChange={handleNumberChange}
                error={errors.decimal.status && errors.decimal.message}
                disabled={loading}
              />
              <TextField
                label="Royalty (%)"
                name="royalty"
                error={errors.royalty.status && errors.royalty.message}
                tooltipText="The percentage of sale price sent to the creator's address when the asset is sold. Applies to both first and second hand sales."
                placeholder="2.5"
                disabled={loading}
                min="1"
                max="80"
              />
            </div>
          </div>
          <div className={!fileObj ? classes.right : classes.mint}>
            <ImagePicker
              name="image"
              setFile={setFile}
              error={errors.image.status}
              title={nameVal}
              unitName={unitName}
              quantity={decimal}
              disabled={loading}
            />
          </div>
          <div className={classes.bottom}>
            <Textarea
              label="Description"
              required
              className={classes.description}
              name="description"
              error={errors.description.status && errors.description.message}
              disabled={loading}
            />
            <SelectDropdown
              label="Metadata Format"
              placeholder="Select one option"
              value={metadataFormat}
              onChange={(value) => setMetadataFormat(value)}
              items={metadataFormatTypes}
              tooltipText="Mint ASA using community or official metadata format. If you are unsure, use ARC3."
            />
            <div className={classes.mint}>
              <div className={classes.mint__header}>
                <span> Traits </span>
                <button
                  type="button"
                  onClick={handleAddMint}
                  disabled={loading}
                >
                  + Add
                </button>
              </div>
              {mints.length > 0 ? (
                mints.map((mint, key) => (
                  <div className={classes.mint__row} key={key}>
                    <TextField
                      value={mint.name}
                      placeholder="Trait Type"
                      onChange={(e) =>
                        handleOnChangeMintInput({
                          event: e,
                          type: "name",
                          id: mint.id,
                        })
                      }
                      error={isMintInputHasError(mint.id, "name")}
                      disabled={loading}
                    />
                    <TextField
                      value={mint.value}
                      placeholder="Trait Value"
                      onChange={(e) =>
                        handleOnChangeMintInput({
                          event: e,
                          type: "value",
                          id: mint.id,
                        })
                      }
                      error={isMintInputHasError(mint.id, "value")}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMint(mint.id)}
                      disabled={loading}
                    >
                      - Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className={classes["mint__no-mint-message"]}>
                  No traits added, click on "Add" to add a trait.
                </p>
              )}
            </div>
            <div className={classes.actions}>
              <Button
                accent="gold"
                minimal
                icon={<PlusIcon />}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Mint NFT"}
              </Button>
            </div>
            {loading && (
              <>
                <p className={classes.progress__note}>{progress.note}</p>
                <div className={classes["mint-progress-bar"]}>
                  <div
                    className={classes["mint-progress"]}
                    style={{ width: `${progress.status}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </form>
      ) : (
        <>
          <h1 className={classes.title}> Mint NFT </h1>
          <Button onClick={handleConnect} className={classes["connect-btn"]}>
            Connect Wallet
          </Button>
        </>
      )}
    </>
  )
}
