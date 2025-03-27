import React, { ReactNode } from 'react';

import { FormProvider as RHFProvider, UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormProvider<T extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<T>) {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {children}
      </form>
    </RHFProvider>
  );
}
