import React, { useState, useEffect } from 'react'; // Importing necessary modules from React and local files
import { apiClient } from '../../api/apiClient';
import { END_POINTS } from '../../api/endPoints';
import { useLocation } from 'react-router-dom';

const CertificateRequestForm = () => {
  // const userId = "b9094110-4b63-45e0-b7d7-44d73c323f7a";
  // const courseId = "797d4ba7-6d4e-45b6-a62b-133e060e3ad4";
  const location = useLocation();
  const { courseId, userId } = location.state || {};

  const [formData, setFormData] = useState({ // State to manage form data
    student_name: '',
    course_name: '',
    start_date: '',
    end_date: '',
    submission_date: '',
    progress: 0,
    certificate_issued: false,
  });

  useEffect(() => {                //Fetch certificate-related data from the server when component mounts
    const fetchFormData = async () => {
      try {
        const response = await apiClient.get(END_POINTS.GET_CERTIFICATE_DATA, {   // Make GET request to retrieve certificate data
          params: { user_id: userId, course_id: courseId },
        });
        setFormData((prev) => ({ ...prev, ...response.data }));   // Merge response data into formData state
      } catch (error) {
        console.error('Error fetching certificate data:', error);
      }
    };

    fetchFormData();
  }, [userId,courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user_id: userId,
        course_id: courseId,
      };

      const response = await apiClient.post(END_POINTS.CREATE_CERTIFICATE_REQUEST, payload);
    const popup = document.createElement("div"); // Create a popup element (validation message)
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1001";
    popup.style.textAlign = "center";

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "1000";

    const message = document.createElement("p");
    message.textContent = "Certificate request submitted successfully!";
    message.style.marginBottom = "10px";
    message.style.color = "#333";
    message.style.fontSize = "16px";

    const closeButton = document.createElement("button");
    closeButton.textContent = "OK";
    closeButton.style.backgroundColor = "#007BFF";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";

    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    });

    popup.appendChild(message);
    popup.appendChild(closeButton);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error submitting certificate request:', error.response?.data || error.message);
      alert('Failed to submit the certificate request. Please try again.');
    }
  };

  const handleChange = (e) => {  // Handle form submission
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

return (         // JSX for the certificate request form
    <div className="min-h-screen bg-gray-100 py-10 px-5">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Certificate Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Student Name</label>
                    <input
                        type="text"
                        name="student_name"
                        value={formData.student_name}
                        onChange={(e) => {
                            const regex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
                            if (regex.test(e.target.value)) { //validate input name
                                handleChange(e);
                            } else {
                                const popup = document.createElement("div");
                                popup.style.position = "fixed";
                                popup.style.top = "50%";
                                popup.style.left = "50%";
                                popup.style.transform = "translate(-50%, -50%)";
                                popup.style.backgroundColor = "#fff";
                                popup.style.padding = "20px";
                                popup.style.borderRadius = "10px";
                                popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                                popup.style.zIndex = "1001";
                                popup.style.textAlign = "center";

                                const overlay = document.createElement("div");
                                overlay.style.position = "fixed";
                                overlay.style.top = "0";
                                overlay.style.left = "0";
                                overlay.style.width = "100%";
                                overlay.style.height = "100%";
                                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                                overlay.style.zIndex = "1000";

                                const message = document.createElement("p");
                                message.textContent = "Only letters and spaces are allowed for the Student Name.";
                                message.style.marginBottom = "10px";
                                message.style.color = "#333";
                                message.style.fontSize = "16px";

                                const closeButton = document.createElement("button");
                                closeButton.textContent = "OK";
                                closeButton.style.backgroundColor = "#007BFF";
                                closeButton.style.color = "#fff";
                                closeButton.style.border = "none";
                                closeButton.style.padding = "10px 20px";
                                closeButton.style.borderRadius = "5px";
                                closeButton.style.cursor = "pointer";
                                closeButton.style.fontSize = "14px";

                                closeButton.addEventListener("click", () => {
                                    document.body.removeChild(popup);
                                    document.body.removeChild(overlay);
                                });

                                popup.appendChild(message);
                                popup.appendChild(closeButton);
                                document.body.appendChild(overlay);
                                document.body.appendChild(popup);
                            }
                        }}
                        placeholder="Enter your full name"
                        className="mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Course Name</label>
                    <input
                        type="text"
                        value={formData.course_name}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Start Date</label>
                    <input
                        type="date"
                        value={formData.start_date?.slice(0, 10)}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">End Date</label>
                    <input
                        type="date"
                        value={formData.end_date?.slice(0, 10)}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Submission Date</label>
                    <input
                        type="date"
                        value={formData.submission_date?.slice(0, 10)}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Progress (%)</label>
                    <input
                        type="number"
                        value={formData.progress}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Certificate Issued</label>
                    <input
                        type="text"
                        value={formData.certificate_issued ? "Yes" : "No"}
                        disabled
                        className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-600"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Request Certificate
                    </button>
                </div>
            </form>
        </div>
    </div>
);
};

export default CertificateRequestForm;
