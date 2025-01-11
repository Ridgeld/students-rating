"use client";

import React from "react";
import styles from './component.module.scss'

function PrimaryButton({ name, type, onClick }){
  return (
    <button className={styles['button']} 
            type={type}
            onClick={onClick}>{name}</button>
  );
};

export default PrimaryButton;
