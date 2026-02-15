type Props = {
  message: string;
  onClose: () => void;
};

export default function Notification({ message, onClose }: Props) {
  return (
    <div className="fixed top-5 right-5 z-50 w-[320px]">
      <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-xl shadow-lg flex justify-between items-start">
        <div className="text-sm">{message}</div>

        <button
          onClick={onClose}
          className="ml-3 font-bold text-red-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}
