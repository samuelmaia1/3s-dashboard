'use client';

import React, { useState } from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { ProgressBar } from "@components/ProgressBar/ProgressBar";

interface MultiStepFormProps<TIn extends FieldValues, TOut extends FieldValues = TIn> {
  methods: UseFormReturn<TIn, any, TOut>; 
  onSubmit: (data: TOut) => void;    
  steps: Array<React.ElementType>;
}

export function MultiStepForm<TIn extends FieldValues, TOut extends FieldValues = TIn>({
  methods,
  onSubmit,
  steps,
}: MultiStepFormProps<TIn, TOut>) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const CurrentStepComponent = steps[currentStep];

  return (
    <>
      {totalSteps > 1 && <ProgressBar progress={((currentStep + 1) / totalSteps) * 100} color="inherit" />}
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CurrentStepComponent 
            onNext={next} 
            onBack={back} 
            isLastStep={currentStep === totalSteps - 1} 
          />
        </form>
      </FormProvider>
    </>
  );
}