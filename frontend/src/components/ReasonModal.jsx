import React from "react";

const ReasonModal = ({ show, onClose, onSubmit }) => {
  const [reason, setReason] = React.useState("");

  if (!show) return null;

  const handleSubmit = () => {
    onSubmit({reason});
    setReason("");
    onClose();
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-invert backdrop-opacity-10 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Enter Reason</h2>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
          placeholder="Write your reason here..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;
