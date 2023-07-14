import React from 'react';

interface EmailVerificationProps {
  onClose: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-main-purple p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>
        <p className="text-lg text-white">Please check your email for verification.</p>
        <button className="text-white bg-main-purple hover:bg-white hover:text-main-purple px-4 py-2 rounded-lg mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
