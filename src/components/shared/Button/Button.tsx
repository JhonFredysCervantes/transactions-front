import styles from "./Button.module.css";

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick} className={styles.Button}>
      {props.children}
    </button>
  );
}
