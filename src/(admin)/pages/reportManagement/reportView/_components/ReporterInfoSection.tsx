import { User, Mail } from "lucide-react";

const ReporterInfoSection = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 mb-4 text-blue-600">
      <User size={20} />
      <h3 className="font-bold text-lg text-gray-800">Reporter Information</h3>
    </div>
    <div className="space-y-4">
      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">Full Name</p>
        <p className="font-bold text-gray-900">John Anderson</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">Email Address</p>
        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
          <Mail size={14} className="text-gray-400" />
          john.anderson@email.com
        </div>
      </div>
    </div>
  </div>
);

export default ReporterInfoSection;