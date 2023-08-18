import React, { useReducer } from "react";
import "./App.css";

const initialStepState = [
  // Set the first step to be active initially
  { isActive: true },
  { isActive: false },
  { isActive: false },
  { isActive: false },
];

function stepReducer(state, action) {
  switch (action.type) {
    case "next":
      if (state.currentStep < state.steps.length - 1) {
        // Create an array of steps where the next step and all previous steps are set to active
        const updatedSteps = state.steps.map((step, index) =>
          index <= state.currentStep + 1 ? { isActive: true } : step
        );
        return {
          currentStep: state.currentStep + 1,
          steps: updatedSteps,
        };
      }
      return state;
    case "prev":
      if (state.currentStep > 0) {
        // Create an array of steps where the current step and all subsequent steps are set to inactive
        const updatedSteps = state.steps.map((step, index) =>
          index >= state.currentStep ? { isActive: false } : step
        );
        return {
          currentStep: state.currentStep - 1,
          steps: updatedSteps,
        };
      }
      return state;
    default:
      return state;
  }
}

function App() {
  // Initialize the state using useReducer
  const [stepState, dispatch] = useReducer(stepReducer, {
    currentStep: 0, // Start with the first step active
    steps: initialStepState,
  });

  // Handle the previous button click
  const handlePrevClick = () => {
    dispatch({ type: "prev" });
  };

  // Handle the next button click
  const handleNextClick = () => {
    dispatch({ type: "next" });
  };

  return (
    <div className="container">
      <div className="pages">
        {stepState.steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Render the step with dynamic border based on isActive */}
            <div
              className="step"
              style={{
                border: step.isActive
                  ? "5px solid rgb(70, 92, 216)"
                  : "5px solid gray",
              }}
            >
              {index + 1}
            </div>
            {index < stepState.steps.length - 1 && (
              // Render the span with dynamic border based on the next step's isActive
              <span
                style={{
                  border: stepState.steps[index + 1].isActive
                    ? "5px solid rgb(70, 92, 216)"
                    : "5px solid gray",
                }}
              ></span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="btns">
        {/* Previous button with dynamic disabled and background color */}
        <button
          data-testid="prevBtn"
          className="prevBtn"
          onClick={handlePrevClick}
          disabled={stepState.currentStep <= 0}
          style={{
            backgroundColor: stepState.currentStep <= 0 ? "gray" : "",
          }}
        >
          Prev
        </button>
        {/* Next button with dynamic disabled and background color */}
        <button
          data-testid="nextBtn"
          onClick={handleNextClick}
          disabled={stepState.currentStep >= stepState.steps.length - 1}
          style={{
            backgroundColor:
              stepState.currentStep >= stepState.steps.length - 1 ? "gray" : "",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
