import { cn } from "@/lib/utils";

export interface stepIndicator {
  step: number;
  currentStep: number;
  titleStep: string;
}

export function StepItem({ step, currentStep, titleStep }: stepIndicator) {
  const isActive = step === currentStep;
  const isCompleted = currentStep > step;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="transition-all rounded-full duration-500">
        <div
          className={cn(
            "h-10 w-10 rounded-full",
            !isActive && !isCompleted && "bg-gray-200",
            !isActive && isCompleted && "bg-blue-600 font-bold",
            isActive && "bg-blue-800",
          )}
        >
          <span
            className={cn(
              "flex h-full w-full items-center justify-center text-sm font-bold text-white transition-all duration-300",
              isActive && "text-white",
              !isActive && isCompleted && "text-white",
              !isActive && !isCompleted && "text-gray-900",
            )}
          >
            {step}
          </span>
        </div>
      </div>

      <span
        className={cn(
          "text-xs transition-all duration-300",
          isActive && "text-blue-800 font-extrabold",
          isActive && isCompleted && "text-green-500",
          !isActive && isCompleted && "text-blue-600 font-bold",
          !isActive && !isCompleted && "text-gray-900",
        )}
      >
        {titleStep}
      </span>
    </div>
  );
}

export default StepItem;
