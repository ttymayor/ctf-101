import type { InjectionKey, Ref } from "vue";

export interface TerminalSessionContext {
  currentStep: Ref<number>;
  registerStep: () => number;
  nextStep: () => void;
}

export const terminalSessionKey: InjectionKey<TerminalSessionContext> = Symbol("TerminalSession");

export const useTerminalSession = () => {
  const currentStep = ref(0);
  let stepCounter = 0;

  const registerStep = () => {
    const id = stepCounter;
    stepCounter++;
    return id;
  };

  const nextStep = () => {
    currentStep.value++;
  };

  const reset = () => {
    currentStep.value = 0;
  };

  const context: TerminalSessionContext = {
    currentStep,
    registerStep,
    nextStep,
  };

  provide(terminalSessionKey, context);

  return {
    currentStep,
    registerStep,
    nextStep,
    reset,
  };
};
