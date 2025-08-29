import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import ContractorActionHub from "./components/ContractorActionHub";
import SelectExistingProject from "./components/SelectExistingProject";
import Pre_BuiltTemplets from "./components/PrebuiltTemplets";
import { WorkflowFlow } from "./components/WorkflowFlow";
import TemporalFlowWorkflow from "./components/TemporalFlowWorkflow";
import ProjectManagement from "./components/ProjectManagement";
import SequenceOfEvent from "./components/SequenceOfEvent";
import Editor from "./pages/editor"
import CorrespondingLettersPage from "./components/CorrespondingLettersPage";

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] =
    useState<string>("Highway Extension");

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  const handleSelectProject = (projectName: string) => {
    setSelectedProject(projectName);
  };


  return (
    <div className="w-full h-screen">
      <Routes>
        <Route
          path="/signup"
          element={<SignUpPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/signin"
          element={<SignInPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/contractor-hub"
          element={<ContractorActionHub onNavigate={handleNavigate} />}
        />
        <Route
          path="/select-existing-project"
          element={
            <SelectExistingProject
              onNavigate={handleNavigate}
              onSelectProject={handleSelectProject}
            />
          }
        />
        <Route
          path="/pre-built-templets"
          element={
            <Pre_BuiltTemplets
              onNavigate={handleNavigate}
              selectedProject={selectedProject}
            />
          }
        />
        <Route
          path="/workflow"
          element={<WorkflowFlow selectedProject={selectedProject} />}
        />
        <Route
          path="/temporal-flow-workflow"
          element={<TemporalFlowWorkflow selectedProject={selectedProject} />}
        />
        <Route
          path="/project-management"
          element={<ProjectManagement />}
        />
        <Route
          path="/editor"
          element={<Editor onNavigate={handleNavigate} />}
        />
        <Route
          path="/sequence-of-event"
          element={<SequenceOfEvent onNavigate={handleNavigate} />}
        />
        <Route
          path="/corresponding-letters"
          element={<CorrespondingLettersPage />}
        />
        <Route path="/" element={<SignUpPage onNavigate={handleNavigate} />} />
      </Routes>
    </div>

  );
}

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
