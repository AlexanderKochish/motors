import React from "react";
import styles from "./loading.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
  text?: string;
}

export default function Loading({ size = 60, color = "#0F172A", text }: LoaderProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.loader}
        style={{
          width: size,
          height: size,
          borderColor: `${color}33`,
          borderTopColor: color,
        }}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
