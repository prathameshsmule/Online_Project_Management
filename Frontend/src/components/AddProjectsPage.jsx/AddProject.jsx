import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from "react-responsive";
import "./AddProject.css";
import { useEffect } from "react";
import "./mediaQueries.css"

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [status] = useState("Registered");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProjectNameInvalid, setIsProjectNameInvalid] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 1000); // Message disappears after 3 seconds
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [successMessage]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ProjectName input
    if (!projectName) {
      setIsProjectNameInvalid(true);
      setError("Project Name is required");
      return;
    } else {
      setIsProjectNameInvalid(false);
    }

    if (
      !projectName ||
      !reason ||
      !type ||
      !division ||
      !category ||
      !priority ||
      !department ||
      !location ||
      !startDate ||
      !endDate
    ) {
      setError("All fields are required");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date");
      return;
    }

    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:5000/createProject", {
        projectName,
        reason,
        type,
        division,
        category,
        priority,
        department,
        location,
        status,
        startDate,
        endDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Reset form after submission
      setProjectName("");
      setReason("");
      setType("");
      setDivision("");
      setCategory("");
      setPriority("");
      setDepartment("");
      setLocation("");
      setStartDate(new Date());
      setEndDate(new Date());
      setError("");
      setSuccessMessage("Project Saved Successfully");
    } catch (error) {
      setError("Failed to insert project");
      setSuccessMessage("");
    }
  };

  return (
    <div className="insert-project-container ">
      <img src="/Header-bg.svg" alt="" />
      <img className="dashboard-logo" src="/Logo.svg" alt="" />
      <h3>
        <i class="fa-solid fa-chevron-left fa-2xs"></i> Create Project
      </h3>
      <form className="form" onSubmit={handleSubmit}>
      {successMessage && <div className="success-message">{successMessage}</div>} 
        <div className="form-group button">
        <input
            type="text"
            id="project-Name"
            className={`name ${isProjectNameInvalid ? "invalid-input" : ""}`}
            value={projectName}
            placeholder="Enter Project Name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary save-button">
            Save Project
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Reason</label>
            <select
              className="form-control"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Reason
              </option>
              <option value="For Business">For Business</option>
              <option value="Dealership">Dealership</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Type
              </option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Division</label>
            <select
              className="form-control"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Division
              </option>
              <option value="Compressor">Compressor</option>
              <option value="Filters">Filters</option>
              <option value="Pumps">Pumps</option>
              <option value="Glass">Glass</option>
              <option value="Water Heater">Water Heater</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="A">Quality A</option>
              <option value="B">Quality B</option>
              <option value="C">Quality C</option>
              <option value="D">Quality D</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Department
              </option>
              <option value="Startery">Startery</option>
              <option value="Finance">Finance</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Stores">Stores</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <select
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Location
              </option>
               <option value="solapur">Solapur</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
             

            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-actions">
          <div className="status">
            <label>Status: </label>
            <h6> {status}</h6>
          </div>
        </div>
        {isMobile && (<button type="submit" className="btn btn-primary save-button-mobile">
            Save Project
          </button>)}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddProject;
