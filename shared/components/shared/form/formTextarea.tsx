'use client'

import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/shared/components/ui/textarea';
import { TextareaHTMLAttributes } from 'react';
import {ClearButton} from '@/shared/components/shared'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea = ({ className, name, label, required, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const error = errors?.[name]?.message as string;
  const value = watch(name);

  const onClickClear = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...rest} />
        {Boolean(value) && <ClearButton onClick={onClickClear} />}
      </div>
      {Boolean(error) && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
