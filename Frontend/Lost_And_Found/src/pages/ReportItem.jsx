import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../App.css';

export default function ReportItem() {

  const isLoggedin = useSelector(state => state.auth.isLoggedin)
  const [previewImgUrl, setPreviewImgUrl] = useState(null);  //for live preview of selected image...
  const fileInputRef = useRef(null);
  const [imgUploadMethod, setImgUploadMethod] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragMode, setIsDragMode] = useState(true);
  const [report, setReport] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
    submitted_to: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReport({
      ...report,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setReport({
      ...report,
      image: file
    });

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewImgUrl(imgUrl);
    }
  };

  const handleSelectChange = (e) => {
    setReport({
      ...report,
      submitted_to: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!report.image) return alert("Image is required!! Please upload an image")
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", report.title);
      formData.append("description", report.description);
      formData.append("location", report.location);
      //formData.append("uploaded_by", user?.id); //Ignored by backend anyways //Again For Security Purpose
      formData.append("image", report.image);
      formData.append("submitted_to", report.submitted_to);
      console.log(user.role);
      //Fix The Code For Security Pupose Status Should change in Backend based on role not from Frontend
      const url =
        user?.role?.toLowerCase() === "staff"
          ? `${import.meta.env.VITE_API_URL}/api/items/staff/report`
          : `${import.meta.env.VITE_API_URL}/api/items/report`

      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`

          }
        }
      );

      alert(response.data.message);

      setReport({
        title: "",
        description: "",
        location: "",
        image: null,
        submitted_to: 1,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (previewImgUrl) {
        setPreviewImgUrl(null);
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error submitting report");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      setPreviewImgUrl(URL.createObjectURL(file));

      setReport({
        ...report,
        image: file
      });
    } else {
      alert("Upload only Images!!");
    }

  }
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const handleDragEnter = (e) => {
    setIsDragging(true);
  }
  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false)
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [isRotated, setIsRotated] = useState(false);
  const streamRef = useRef(null);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 50);
      }
      streamRef.current = stream;  //saved reference
    } catch (error) {
      alert("Camera Access Denied!!");
      setIsCameraOn(false);
      console.log(error);
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      videoRef.current.srcObject = null;

    }
    setIsCameraOn(false);
  }

  const captureImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!streamRef.current && !isCameraOn) {
      return alert("Camera Access Denied!!")
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const imgName = `captured_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.png`  // need to imporve for scaling
      const imageFile = new File([blob], imgName, { type: "image/png" });

      setReport({
        ...report,
        image: imageFile
      });
      if (imageFile) {
        const imgUrl = URL.createObjectURL(imageFile);
        setPreviewImgUrl(imgUrl);
      }
    }, 'image/png');

    stopCamera();
  };
  const toggleCameraFacing = () => {
    if(streamRef.current){
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment');
  }

useEffect(()=>{
  if(isCameraOn){
     startCamera();
  }
}, [cameraFacing]);

  useEffect(() => {

    return () => {
      stopCamera()
    };
  }, []);

  if (!isLoggedin) {
    return <Navigate to={'/'} replace />
  }
  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-100 p-4 sm:p-6 py-6 ">
      <div className="bg-white shadow-lg rounded-xl p-5 sm:p-8 w-full max-w-md mx-auto">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Report Found Item
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="title"
              value={report.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={report.description}
              onChange={handleChange}
              //no need to be mandatory..other info is enough
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={report.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image of Item
            </label>

            <div className="flex flex-row justify-evenly items-center w-full h-auto">
              <div className={`w-auto h-auto p-2 rounded-lg m-1 cursor-pointer ${isCameraOn ? 'bg-gray-400' : ''}`}>
                <i className="fa-regular fa-camera "
                  onClick={() => {
                    startCamera();
                    setIsCameraOn(true);
                    setIsDragMode(false);
                  }}></i>
              </div>
              <div className={`w-auto h-auto p-2 rounded-lg m-1 cursor-pointer ${isDragMode ? 'bg-gray-300' : ''}`}>
                <i className="fa-regular fa-folder-open"
                  onClick={() => {
                    setIsDragMode(true);
                    setIsCameraOn(false);
                    stopCamera();
                  }}
                ></i>
              </div>
            </div>

            {/* Preview of upload */}
            {
              (previewImgUrl) ?
                <div className="border-2 boder-black relative">
                  <img src={previewImgUrl} alt="Preview"
                    className="w-full h-60 object-cover border-gray-900 p-1" />

                  {/* cancel button */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-gray-900/60 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg backdrop-blur-md"
                    onClick={() => {
                      setPreviewImgUrl(null);
                      setReport({
                        ...report,
                        image: null
                      });
                      if (!isDragMode) {
                        setIsCameraOn(true);
                        startCamera();
                      }
                    }}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                </div> :
                null

            }

            {/* Camera */}
            {
              (isCameraOn && !previewImgUrl) ?
                <div className="relative w-full h-60 rounded-xl overflow-hidden shadow-inner bg-gray-900">
                  <video ref={videoRef} autoPlay
                    className="w-full h-auto object-cover"></video>
                  <canvas ref={canvasRef} className="hidden" />

                  {/* camera flip button */}
                  <button
                    type="button"
                    className={`cursor-pointer absolute bottom-4 right-20 bg-white-900/60 hover:bg-gray-500 hover:scale-110 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md ${isRotated ? 'rotate-180' : 'rotate-0'}`} 
                    onClick={() => {
                      setIsRotated(prev => !prev);
                      toggleCameraFacing();
                    }}>
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </button>

                  {/* capture button */}
                  <div onClick={captureImg}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 cursor-pointer group">
                    <div
                      className=" bg-transparent h-14 w-14 rounded-full border-4 border-white/80 flex justify-center items-center
                      group-hover:border-white group-focus:border-gray-300 transition-all duration-300
                      group-hover:scale-110 group-hover:bg-gray-800">
                      <div className="w-10 h-10 bg-white rounded-full group-focus:scale-90  group-focus:bg-gray-600 transition-all duration-150 shadow-md">
                      </div>
                    </div>
                  </div>
                </div> :
                null
            }


            {
              (isDragMode && !previewImgUrl) ?
                <div className={`relative flex flex-col w-full h-60 border-dashed border-2 border-gray-500
                rounded-lg cursor-pointer justify-center items-center overflow-hidden overfloq-hidden transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                  <p className="text-center text-gray-500">Click to Upload or Drag and Drop the Image Here</p>
                </div> :
                null
            }
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Submitted to
            </label>
            <select
              onChange={handleSelectChange}
              value={report.submitted_to}
              required
              className="w-full border rounded-lg"
            >
              <option value={4}>B. B. Dhuri</option>
              <option value={4}>S. S. Naik</option>
              <option value={4}>J. S. Khot</option>
              <option value={4}>H. D. Naik</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}