import styles from "./Button.module.css";

interface ButtonProps {
  typeButton: string;
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={ 
        props.typeButton === "primary" ? styles.ButtonPrimary :
        props.typeButton === "secondary" ? styles.ButtonSecondary :
        props.typeButton === "warning" ? styles.ButtonWarning :
        "primary"
      }
    >
      {props.children}
    </button>
  );
}
