import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
}

interface CheckoutStepperProps {
  currentStep: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export const CheckoutStepper = ({ currentStep, steps, onStepClick }: CheckoutStepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isClickable = onStepClick && (isCompleted || currentStep >= step.id);

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                    isCompleted && "bg-secondary text-secondary-foreground",
                    isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground",
                    isClickable && "cursor-pointer hover:scale-110"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step.id + 1}</span>
                  )}
                </button>
                
                {/* Step Name */}
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[100px] hidden sm:block",
                    isActive && "text-primary",
                    isCompleted && "text-secondary",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 transition-all",
                    isCompleted ? "bg-secondary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
