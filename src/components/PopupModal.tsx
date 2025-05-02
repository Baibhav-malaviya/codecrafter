import React from "react";
import { X } from "lucide-react";
import useOutsideClick from "@/hooks/useOutsideClick";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const PopupModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const ref = useOutsideClick<HTMLDivElement>(onClose);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div ref={ref} className="bg-white p-4 rounded-md shadow-lg max-w-md w-full max-h-full overflow-y-auto">
				<div className="flex justify-end">
					<button
						className="text-primary bg-slate-800/30 mb-2 rounded-full p-2 font-semibold"
						onClick={onClose}
						aria-label="Close modal"
					>
						<X size={16} />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default PopupModal;
