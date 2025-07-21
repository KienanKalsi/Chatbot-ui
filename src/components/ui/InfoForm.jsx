export default function InfoForm() {
    return (
      <div className="bg-red-50 p-4 rounded-2xl mt-2 shadow-sm space-y-4 text-sm text-gray-700">
        <p>We just need some more information from you to proceed:</p>
        <div className="space-y-2">
          <div>
            <label className="text-red-700 font-medium">Name</label>
            <input className="w-full border-b outline-none bg-transparent mt-1" type="text" />
          </div>
          <div>
            <label className="text-gray-500 font-medium">Email</label>
            <input className="w-full border-b outline-none bg-transparent mt-1" type="email" />
          </div>
          <button className="bg-red-700 text-white px-4 py-2 mt-2 rounded-full">
            Send
          </button>
        </div>
      </div>
    );
  }
  