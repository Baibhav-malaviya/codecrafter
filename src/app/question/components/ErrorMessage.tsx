import React from "react";

interface ErrorMessageProps {
	error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
	error ? <p className="text-red-500">{error}</p> : null;

export default ErrorMessage;
