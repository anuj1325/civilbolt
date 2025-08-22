import React, { useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
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
import Editor from "./pages/editor";

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] =
    useState<string>("Highway Extension");

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  const handleSelectProject = (projectName: string) => {
    setSelectedProject(projectName);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          element={
            isAuthenticated ? (
              <ContractorActionHub onNavigate={handleNavigate} />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/select-existing-project"
          element={
            isAuthenticated ? (
              <SelectExistingProject
                onNavigate={handleNavigate}
                onSelectProject={handleSelectProject}
              />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/pre-built-templets"
          element={
            isAuthenticated ? (
              <Pre_BuiltTemplets
                onNavigate={handleNavigate}
                selectedProject={selectedProject}
              />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/workflow"
          element={
            isAuthenticated ? (
              <WorkflowFlow selectedProject={selectedProject} />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/temporal-flow-workflow"
          element={
            isAuthenticated ? (
              <TemporalFlowWorkflow selectedProject={selectedProject} />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/project-management"
          element={
            isAuthenticated ? (
              <ProjectManagement />
            ) : (
              <SignInPage onNavigate={handleNavigate} />
            )
          }
        />
        <Route
          path="/editor"
          element={<Editor onNavigate={handleNavigate} />}
        />
        <Route path="/" element={<SignUpPage onNavigate={handleNavigate} />} />
      </Routes>
    </div>

  );
}

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ""}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <AppContent />
      </Router>
    </Auth0Provider>
  );
};

export default App;
