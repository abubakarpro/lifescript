import React from "react";
import Image from "next/image";
import classes from "./Button.module.css"

const Button = ({ title, border, background, width, height = "auto", padding, borderRadius, color, onClick, image, fontSize }) => {
  const styles = {
    border: border || "none",
    background: background,
    width: width,
    padding: padding,
    borderRadius: borderRadius,
    color: color,
    height: height,
    fontSize: fontSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const styles2 = {
    padding: "0 4px 0 0",
  }

  return (
    <button onClick={onClick} style={styles} className={classes.btnMain}>
      {image != undefined && <Image alt="image" src={image} style={styles2} />}
      {title}</button>
  )
}

export default Button