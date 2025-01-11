"use client";

import React from "react";
import styles from './component.module.scss'

function SecondaryButton({icon,  name, type, onClick }){
  return (
    <button className={styles['button']} 
            type={type}
            onClick={onClick}>
                <div className={styles['icon']}>
                    {icon}
                </div>{name}</button>
  );
};

export default SecondaryButton;
