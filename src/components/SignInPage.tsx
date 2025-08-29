import React, { useState } from "react";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { LinkButton } from "@/ui/components/LinkButton";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { useNavigate } from "react-router-dom";

function SignInPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSignIn = () => {
    navigate('/contractor-hub');
  };

  const handleSignUp = () => {
    onNavigate('signup');
  };

  const handleGoogleSignIn = () => {
    navigate('/contractor-hub');
  };

  const handleAppleSignIn = () => {
    navigate('/contractor-hub');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="flex h-full w-full flex-wrap items-start bg-default-background mobile:flex-col mobile:flex-wrap mobile:gap-0">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-center gap-12 self-stretch px-12 py-12 relative mobile:h-auto mobile:w-full mobile:flex-none">
        <img
          className="w-full grow shrink-0 basis-0 object-cover absolute inset-0"
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60"
          alt="Background"
        />
        <div className="flex items-start bg-neutral-950 absolute inset-0 opacity-50" />
        <div className="flex w-full max-w-[448px] grow shrink-0 basis-0 flex-col items-start justify-center gap-12 relative mobile:h-auto mobile:w-full mobile:max-w-[448px] mobile:flex-none">
          <img
            className="h-8 flex-none object-cover invert"
            src="https://images.unsplash.com/photo-1687613034347-0e25337c9021?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            alt="Logo"
          />
          <div className="flex flex-col items-start justify-center gap-16 pb-32 mobile:px-0 mobile:py-0">
            <div className="flex flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-white">
                Welcome Back
              </span>
              <span className="text-heading-3 font-heading-3 text-neutral-200">
                Sign in to manage your construction contracts
              </span>
            </div>
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
                <IconWithBackground
                  variant="success"
                  size="medium"
                  icon="FeatherFileText"
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-white">
                    Contract Review
                  </span>
                  <span className="text-caption font-caption text-neutral-200">
                    AI-powered document analysis
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
                <IconWithBackground
                  variant="success"
                  size="medium"
                  icon="FeatherShieldCheck"
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-white">
                    Compliance Check
                  </span>
                  <span className="text-caption font-caption text-neutral-200">
                    Automatic regulation verification
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
                <IconWithBackground
                  variant="success"
                  size="medium"
                  icon="FeatherSearch"
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-white">
                    Hidden Clause Detection
                  </span>
                  <span className="text-caption font-caption text-neutral-200">
                    Identify potential risks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch border-l border-solid border-neutral-border px-12 py-12">
        <div className="flex w-full max-w-[448px] flex-col items-start justify-center gap-8">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              Sign in to your account
            </span>
            <div className="flex w-full flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Don&#39;t have an account?
              </span>
              <LinkButton
                variant="brand"
                iconRight="FeatherChevronRight"
                onClick={handleSignUp}
              >
                Sign Up
              </LinkButton>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <TextField
              className="h-auto w-full flex-none"
              label=""
              helpText=""
              icon="FeatherMail"
            >
              <TextField.Input
                placeholder="Work Email"
                value={formData.email}
                onChange={handleInputChange('email')}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label=""
              helpText=""
              icon="FeatherLock"
            >
              <TextField.Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
              />
            </TextField>
            <div className="flex w-full items-start justify-end">
              <LinkButton onClick={handleForgotPassword}>
                Forgot password?
              </LinkButton>
            </div>
            <Button
              className="h-12 w-full flex-none"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex h-px grow shrink-0 basis-0 items-start bg-neutral-border" />
            <span className="text-body font-body text-subtext-color">
              or continue with
            </span>
            <div className="flex h-px grow shrink-0 basis-0 items-start bg-neutral-border" />
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417516/shared/z0i3zyjjqkobzuaecgno.svg"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </OAuthSocialButton>
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417561/shared/kplo8lv2zjit3brqmadv.png"
              onClick={handleAppleSignIn}
            >
              Sign in with Apple
            </OAuthSocialButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;