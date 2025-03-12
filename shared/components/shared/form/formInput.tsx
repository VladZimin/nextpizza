import {InputHTMLAttributes} from 'react'
import { RequiredSymbol } from '../requiredSymbol';
import { Input } from '../../ui';
import { ErrorText } from '../errorText';
import { ClearButton } from '../clearButton';
import {useFormContext} from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}
export const FormInput = ({className, label, name, required}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    ...rest
  } = useFormContext()

  const value = watch(name)
  const error = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '')
  }

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...rest} />

        {Boolean(value) && <ClearButton onClick={onClickClear} />}
      </div>

      {Boolean(error) && <ErrorText text={error} className={'mt-2'}/>}
    </div>
  );
}

