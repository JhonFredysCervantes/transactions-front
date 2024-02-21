import styles from "./Button.module.css";

interface ButtonProps {
  isPrimary: boolean;
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.isPrimary ? styles.ButtonPrimary : styles.ButtonSecondary}
    >
      {props.children}
    </button>
  );
}
