import React, { ComponentProps, ReactNode } from "react";
import styles from "./form-field.module.css";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type AsType = "input" | "textarea" | "select";

type Props<T extends FieldValues, TAs extends AsType> = {
  as?: TAs;
  children?: ReactNode;
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  helpText?: string;
} & (TAs extends "input"
  ? Omit<ComponentProps<"input">, "name">
  : TAs extends "textarea"
    ? Omit<ComponentProps<"textarea">, "name">
    : Omit<ComponentProps<"select">, "name">);

const FormField = <T extends FieldValues, TAs extends AsType = "input">({
  as = "input" as TAs,
  children,
  control,
  name,
  label,
  required = false,
  helpText,
  ...props
}: Props<T, TAs>) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  });

  const error = errors[name] as { message?: string } | undefined;

  const baseProps = {
    ...field,
    id: name as string,
    className: `${styles.input} ${error ? styles.inputError : ""}`,
    required,
  };

  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label htmlFor={name as string} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {as === "input" && <input {...baseProps} {...(props as ComponentProps<"input">)} />}

      {as === "textarea" && (
        <textarea {...baseProps} {...(props as ComponentProps<"textarea">)}>
          {children}
        </textarea>
      )}

      {as === "select" && (
        <select {...baseProps} {...(props as ComponentProps<"select">)}>
          {children}
        </select>
      )}

      {helpText && !error && <p className={styles.helpText}>{helpText}</p>}

      {error && <p className={styles.errorText}>{error.message}</p>}
    </div>
  );
};

export default FormField;
