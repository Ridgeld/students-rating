"use client";

import React from "react";
import styles from './component.module.scss'

const SearchInput = ({placeholder,  value, onChange }) => {
  return (
    <div className={styles['input-body']}>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles['input']}
            />
        <div className={styles['icon']}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19.0001L14.657 14.6571M14.657 14.6571C15.3999 13.9142 15.9892 13.0323 16.3912 12.0616C16.7933 11.091 17.0002 10.0507 17.0002 9.00008C17.0002 7.94948 16.7933 6.90917 16.3912 5.93854C15.9892 4.96791 15.3999 4.08597 14.657 3.34308C13.9141 2.6002 13.0322 2.01091 12.0615 1.60886C11.0909 1.20681 10.0506 0.999878 8.99999 0.999878C7.94939 0.999878 6.90908 1.20681 5.93845 1.60886C4.96782 2.01091 4.08588 2.6002 3.34299 3.34308C1.84266 4.84341 0.999786 6.8783 0.999786 9.00008C0.999786 11.1219 1.84266 13.1568 3.34299 14.6571C4.84332 16.1574 6.87821 17.0003 8.99999 17.0003C11.1218 17.0003 13.1567 16.1574 14.657 14.6571Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
  );
};

export default SearchInput;
