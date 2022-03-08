/* eslint-disable react/jsx-no-duplicate-props */
import classNames from "classnames"
import classes from "./TextField.module.scss"
import { ReactComponent as QuestionMarkIcon } from "new_assets/icons/question-mark-circle.svg"
import { Tooltip } from "new_components"
import { useEffect, useRef } from "react"

export const TextField = ({
  placeholder,
  value,
  onChange = () => {},
  onEnterPress = () => {},
  className,
  label,
  required,
  error,
  icon,
  name,
  type = "text",
  min,
  max,
  labelAccent,
  disabled,
  capitalizeLabel,
  goldBorder,
  textCenter,
  tooltipText,
  focus = false,
}) => {
  const inputRandomId = `text-field-${Math.random()}`
  const bidNumberInput = useRef(null)

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && onEnterPress) {
      onEnterPress(e)
    }
  }

  useEffect(() => {
    if (focus) {
      bidNumberInput.current.focus()
    }
  }, [])

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        disabled && classes.disabled,
        className
      )}
    >
      {label && (
        <label
          htmlFor={inputRandomId}
          className={classNames(
            classes.label,
            labelAccent && classes["label-accent-gold"],
            capitalizeLabel && classes["label-capitalize"]
          )}
        >
          {label} {required && <span>*</span>}
          {tooltipText && (
            <Tooltip placement="auto" text={tooltipText}>
              <QuestionMarkIcon />
            </Tooltip>
          )}
        </label>
      )}
      <div
        className={classNames(
          classes["input-container"],
          goldBorder && classes.goldBorder,
          textCenter && classes.textCenter
        )}
      >
        {icon && icon}
        <input
          className={classes.input}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          defaultValue={name === "decimal" && type === "number" ? 0 : value}
          onChange={(e) => onChange(e)}
          onKeyDown={handleKeyDown}
          id={inputRandomId}
          name={name}
          disabled={disabled}
          ref={bidNumberInput}
        />
      </div>
      <div
        className={classNames(
          classes["error-container"],
          textCenter && classes.textCenter
        )}
      >
        {error}
      </div>
    </div>
  )
}
