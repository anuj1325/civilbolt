import React, { useState } from "react";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { LinkButton } from "@/ui/components/LinkButton";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { useNavigate } from "react-router-dom";

function SignUpPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCreateAccount = () => {
    navigate('/contractor-hub');
  };

  const handleSignIn = () => {
    onNavigate('signin');
  };

  const handleGoogleSignUp = () => {
    navigate('/contractor-hub');
  };

  const handleAppleSignUp = () => {
    navigate('/contractor-hub');
  };

  const handleTermsClick = () => {
    console.log('Terms of service clicked');
  };

  const handlePrivacyClick = () => {
    console.log('Privacy policy clicked');
  };

  return (
    <div className="flex h-full w-full flex-wrap items-start bg-neutral-50 mobile:flex-col mobile:flex-wrap mobile:gap-0">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-center gap-12 self-stretch px-12 py-12 relative mobile:h-auto mobile:w-full mobile:flex-none">
        <img
          className="w-full grow shrink-0 basis-0 object-cover absolute inset-0"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60"
          alt="Background"
        />
        <div className="flex items-start bg-gradient-to-t from-neutral-950 to-transparent absolute inset-0 opacity-80" />
        <div className="flex w-full max-w-[448px] grow shrink-0 basis-0 flex-col items-start justify-between relative mobile:h-auto mobile:w-full mobile:max-w-[448px] mobile:flex-none">
          <div className="flex flex-col items-start gap-8">
            <img
              className="h-8 flex-none object-cover invert"
              src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
              alt="Logo"
            />
            <div className="flex flex-col items-start gap-4">
              <span className="text-4xl font-bold text-white">
                CIVIL BOLT AI
              </span>
              <span className="text-xl font-medium text-neutral-200">
                Streamline your document workflow with AI
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 pb-8">
            <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
              <IconWithBackground size="medium" icon="FeatherFileText" />
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-semibold text-white">
                  Pre-Bid Risk Assessment
                </span>
                <span className="text-sm text-neutral-200">
                  AI-powered insights
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
              <IconWithBackground size="medium" icon="FeatherShieldCheck" />
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-semibold text-white">
                  Contract Risk
                </span>
                <span className="text-sm text-neutral-200">
                  Enterprise-grade protection
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
              <IconWithBackground size="medium" icon="FeatherZap" />
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-semibold text-white">
                  Dispute Resolution
                </span>
                <span className="text-sm text-neutral-200">
                  Lightning-fast results
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg px-4 py-4 backdrop-blur-sm">
              <IconWithBackground size="medium" icon="FeatherTool" />
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-semibold text-white">
                  Daily Operations
                </span>
                <span className="text-sm text-neutral-200">
                  Hassle-free management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch border-l border-solid border-neutral-border px-12 py-12">
        <div className="flex w-full max-w-[448px] flex-col items-start justify-center gap-8">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-3xl font-bold text-gray-900">
              Create your account
            </span>
            <div className="flex w-full flex-wrap items-start gap-2">
              <span className="text-base text-gray-600">
                Already have an account?
              </span>
              <LinkButton
                className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
                variant="brand"
                iconRight="FeatherChevronRight"
                onClick={handleSignIn}
              >
                Sign In
              </LinkButton>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <TextField
              className="h-auto w-full flex-none"
              label=""
              helpText=""
              icon="FeatherUser"
            >
              <TextField.Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
              />
            </TextField>
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
            <Button
              className="h-12 w-full flex-none"
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
          </div>
          <div className="flex w-full items-center gap-4">
            <div className="flex h-px grow shrink-0 basis-0 items-start bg-gray-300" />
            <span className="text-base text-gray-600">
              or continue with
            </span>
            <div className="flex h-px grow shrink-0 basis-0 items-start bg-gray-300" />
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417516/shared/z0i3zyjjqkobzuaecgno.svg"
              onClick={handleGoogleSignUp}
            >
              Sign up with Google
            </OAuthSocialButton>
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417561/shared/kplo8lv2zjit3brqmadv.png"
              onClick={handleAppleSignUp}
            >
              Sign up with Apple
            </OAuthSocialButton>
          </div>
          <div className="flex flex-wrap items-start gap-1">
            <span className="text-sm text-gray-600">
              By signing up you agree to the
            </span>
            <LinkButton
              variant="brand"
              size="small"
              onClick={handleTermsClick}
            >
              Terms of Service
            </LinkButton>
            <span className="text-sm text-gray-600">
              and
            </span>
            <LinkButton
              variant="brand"
              size="small"
              onClick={handlePrivacyClick}
            >
              Privacy Policy
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;