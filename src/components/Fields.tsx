import type { ReactNode } from "react";

interface BaseProps{
    id: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    value: string;
}

interface InputProps extends BaseProps {
    type?: "text" | "number" | "password" | "tel"
    placeholder?: string;
}

export const Input = ( { id, value, type, required, placeholder, onChange }: InputProps ) => {
  return (
    <input
        type={ type }
        id={ id }
        name={ id }
        value={ value }
        className="border rounded w-full py-2 px-3 mb-2"
        placeholder= { placeholder }
        required={ required }
        onChange={ onChange }
    />
  )
}


interface TextareaProps extends BaseProps{
    placeholder?: string;
}

export const Textarea = ( { id, value, required, placeholder, onChange }: TextareaProps ) => {
  return (
    <textarea
        id={ id }
        name={ id }
        className="border rounded w-full py-2 px-3"
        placeholder={ placeholder }
        required= { required }
        onChange={ onChange }
        value={ value }
    >
    </textarea>
  )
}


interface SelectProps extends BaseProps{
    children?: ReactNode;
}

export const Select = ( { id, value, required, onChange, children }: SelectProps ) => {
  return (
    <select
        id={ id }
        name={ id }
        className="border rounded w-full py-2 px-3"
        required = { required }
        onChange={ onChange }
        value={ value }
        >
        { children }
    </select>
  )
}


const fieldsMap = {
    input: Input,
    textarea: Textarea,
    select: Select
} as const;

type FieldMap = {
  input: InputProps;
  textarea: TextareaProps;
  select: SelectProps;
};

type FieldProps = {
  label?: string;
  hasLabel: boolean;
  marg?: number;
  children?: ReactNode;
} & {
  [K in keyof FieldMap]: {
    name: K;
    inProp: FieldMap[K];
  }
}[keyof FieldMap];


const Fields = ({ name, label = "No label given", hasLabel, marg = 4, inProp}: FieldProps) => {
    const Field = fieldsMap[name];

    if(!Field) {
        return null;
    }

    return (
        <div className={ `mb-${marg}` }>
            { hasLabel && <label htmlFor={ inProp.id } className="block text-gray-700 font-bold mb-2">{ label }</label>}
            <Field {...inProp} >
                { name === "select" ? inProp.children : null }
            </Field>
        </div>
    )
}

export default Fields
