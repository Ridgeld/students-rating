"use client";

import React from "react";
import styles from './component.module.scss'

const DefaultInput = ({ placeholder, type, value, onChange, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={styles['input']}
    />
  );
};

export default DefaultInput;
