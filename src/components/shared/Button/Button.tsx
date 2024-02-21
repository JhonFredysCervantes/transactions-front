import styles from './Button.module.css';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  
  export function Button(props: ButtonProps) {
    return (
      <button onClick={props.onClick} className={styles.Button}>
        {props.children}
      </button>
    );
  }
  