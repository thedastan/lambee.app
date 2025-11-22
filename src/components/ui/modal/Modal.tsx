import React, { ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40"
				onClick={onClose}>
				<div className="fixed inset-0 flex items-center justify-center z-50 p-2">
					<div
						className="bg-white rounded-[16px] shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-between px-4 pt-4 ">
							<h1 className="text-[20px] font-[700] text-[#18181B]">{title}</h1>
							<button
								onClick={onClose}
								className="text-[#51525C]   text-2xl leading-none"
								aria-label="Закрыть модалку">
								&times;
							</button>
						</div>

						<div className="p-4">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
