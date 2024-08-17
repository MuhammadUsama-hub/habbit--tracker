import { Html, Tailwind } from '@react-email/components';

type VerifyProp = {
  username: string;
  verifycode: string;
};

export default function VerifyEmail({ username, verifycode }: VerifyProp) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-100 p-6">
          <div className="bg-white rounded-md p-4 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">Email Verification</h1>
            <p className="text-gray-700 mt-4">
              Hello {username},
            </p>
            <p className="text-gray-700 mt-2">
              Thank you for registering with us! Please use the following code to verify your email address:
            </p>
            <div className="mt-4">
              <span className="bg-blue-500 text-white font-mono text-xl px-4 py-2 rounded-md">
                {verifycode}
              </span>
            </div>
            <p className="text-gray-600 mt-4">
              If you did not sign up for this account, you can ignore this email.
            </p>
            <p className="text-gray-600 mt-4">
              Regards,<br />
              The Usama Team
            </p>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
