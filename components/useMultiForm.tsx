import { ReactElement, useState } from "react";

export default function useMultiForm(steps: ReactElement[]) {
 const [currentStepIndex, setCurrentStepIndex] = useState(0)

function next() {
    setCurrentStepIndex(i => {
        if (i >= steps.length - 1) return i
        return i + 1
    })
}
function back() {
    setCurrentStepIndex(i => {
        if (i <= 0) return i
        return i - 1
    })
}
function goTo(index: number) {
    setCurrentStepIndex(index)
}
 return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isSecondStep: currentStepIndex === 1,
    isLastStep: currentStepIndex === steps.length - 1,
    teacherSignUpStep: currentStepIndex === 2,
    steps,
    goTo,
    next,
    back
 }
}
