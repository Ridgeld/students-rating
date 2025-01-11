"use client";

import React from "react";
import Rive from "@rive-app/react-canvas";
import styles from './component.module.scss'
import { useRive } from "@rive-app/react-canvas";


const Logo = () => {
    const { rive, RiveComponent} = useRive({
        src: 'logo.riv',
        stateMachines: 'State Machine 1',
        autoplay: true

    })
    if(rive){
        console.log(rive.contents)
    }
  return (
    <div className={styles['container']}>
        <RiveComponent  
            className={styles['animation-box']}/>
    </div>
  );
};

export default Logo;
