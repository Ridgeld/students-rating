"use client";

import React from "react";
import Rive from "@rive-app/react-canvas";
import styles from './component.module.scss'
import { useRive } from "@rive-app/react-canvas";


const SplashScreen = () => {
    const { rive, RiveComponent} = useRive({
        src: 'splash_animation.riv',
        stateMachines: 'State Machine 1',
        autoplay: true

    })
    if(rive){
        console.log(rive.contents)

    }
  return (
    <div className={styles['container']}>
        <RiveComponent 
        onMouseOver={() => rive.play()}
            // src='splash_screen_kstu_rating.riv' 
            // animations='scale logo bg' 
            className={styles['animation-box']}/>
    </div>
  );
};

export default SplashScreen;
