import React from "react";

interface EmailVerificationProps {
  onClose: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-overlay">
      <div className="bg-dark-grey p-6 rounded-md shadow-md">
        <h2 className="text-white-custom text-heading-lg text font-bold text-white mb-2">
          Register Successful!
        </h2>
        <p className="text-medium-grey text-body-lg text-lg text-white mb-4">
          Please check your email for verification before logging in.
        </p>
        <button
          className="text-white bg-main-purple hover:bg-main-purple-hover px-4 py-2 rounded-full w-full mt-4 h-[40px]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
