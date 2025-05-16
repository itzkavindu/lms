import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { backendUrl } from "../App";

const CertificateRequests = () => {
  const [requests, setRequests] = useState(null);

  const fetchRequests = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/certificates/all");
    if (data.certificateRequests) {
      setRequests(data.certificateRequests.reverse());
    } else {
      toast.error("No requests found");
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const handleAction = async (requestId, action) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/educator/${action}-certificate`,
        { requestId }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRequests(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return requests ? (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">Certificate Requests</h1>
      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-gray-700 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Requested On</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {requests.map((req, index) => (
              <tr key={req._id} className="border-b">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={req.student.imageUrl}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span>{req.student.name}</span>
                </td>
                <td className="px-4 py-3">{req.courseTitle}</td>
                <td className="px-4 py-3">
                  {new Date(req.requestedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleAction(req._id, "approve")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "decline")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CertificateRequests;
