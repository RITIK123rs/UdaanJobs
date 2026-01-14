import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function PostJob({
  isEditPost = false,
  setActiveContent,
  getRecruiterData,
  editPostId,
  addMessageBox,
}) {
  const API_URL= import.meta.env.VITE_API_URL;
  const resetJobPostData = {
    role: "",
    jobType: "full-time",
    industryType: "",
    education: "",
    experience: "fresher",
    location: "",
    workMode: "Onsite",
    closingDate: "",
    salary: "",
    jobDescription: "",
    skillsRequired: "",
    roleAndResponsibilities: "",
  };

  const [jobPostData, setJobPostData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobPostData((prev) => ({ ...prev, [name]: value }));
  };

  const postJobPostData = async (e) => {
    e.preventDefault();
    const data = {
      ...jobPostData,
      skillsRequired: jobPostData.skillsRequired
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill != ""),
    };
    try {
      const res = await fetch(`${API_URL}/recruiter/postJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      setJobPostData(resetJobPostData);
      getRecruiterData();
    } catch (error) {
      console.log(error);
    }
    addMessageBox("check","Job post created successfully")
  };

  const postEditJobPostData = async (e) => {
    e.preventDefault();
    const data = {
      ...jobPostData,
      skillsRequired: jobPostData?.skillsRequired
        ?.split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill != ""),
    };
    console.log(data);
    await fetch(
      `${API_URL}/recruiter/UpdatePostData/${editPostId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    getRecruiterData();
    setActiveContent("jobPosted");
    addMessageBox("check","JobPost Updated successfully");
  };

  useEffect(() => {
    async function editJobPost() {
      console.log(editPostId);
      await fetch(`${API_URL}/recruiter/jobPostData/${editPostId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setJobPostData({
            ...data,
            skillsRequired: data.skillsRequired.join(","),
          });
        });
    }
    if (isEditPost) editJobPost();
    else setJobPostData(resetJobPostData);
  }, []);

  return (
    <div className="postJob ps-2">
      <h1 className="pageTitle mt-3">{isEditPost ? "Update Post Job": "Post Job" }</h1>
      <hr className="divider" />
      {isEditPost ? (
        <button
          className="backBtn fs-5 ms-2 p-1 px-2 mb-3 rounded-3 d-flex align-items-center fw-bold"
          onClick={() => setActiveContent("jobPosted")}
          type="button"
        >
          <FaArrowLeft className="me-2" /> BACK
        </button>
      ) : ""}
      <form
        onSubmit={isEditPost ? postEditJobPostData : postJobPostData}
        className="mainSection"
        method="POST"
      >
        <section className="formSection">
          <h3 className="heading">Job Information</h3>

          <div className="formRow">
            <div className="formGroup">
              <label>Job Title</label>
              <input
                type="text"
                name="role"
                placeholder="Enter the job title"
                value={jobPostData?.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Industry Type</label>
              <input
                type="text"
                name="industryType"
                placeholder="Enter the industry type"
                value={jobPostData?.industryType}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter city or state"
                value={jobPostData?.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Job Type</label>
              <select
                name="jobType"
                value={jobPostData?.jobType}
                onChange={handleChange}
                required
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Work Mode</label>
              <select
                name="workMode"
                value={jobPostData?.workMode}
                onChange={handleChange}
              >
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="Enter salary, e.g., 50000-70000"
                value={jobPostData?.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup" style={{ width: "48%" }}>
              <label>Experience</label>
              <select
                name="experience"
                value={jobPostData?.experience}
                onChange={handleChange}
              >
                <option value="fresher">Fresher</option>
                <option value="1-3">1–3 Years</option>
                <option value="3-5">3–5 Years</option>
                <option value="5+">5+ Years</option>
              </select>
            </div>

            <div className="formGroup" style={{ width: "48%" }}>
              <label>Education</label>
              <input
                type="text"
                name="education"
                placeholder="Enter required education"
                value={jobPostData?.education}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Apply Before</label>
              <input
                type="date"
                name="closingDate"
                value={jobPostData?.closingDate.split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="formSection mt-5 me-4">
          <h3 className="heading">Job Description</h3>
          <textarea
            rows="15"
            name="jobDescription"
            placeholder="Enter required education"
            value={jobPostData?.jobDescription}
            onChange={handleChange}
            required
          />
        </section>

        <section className="formSection mt-5 me-4">
          <h3 className="heading">Skills Required</h3>
          <textarea
            rows="2"
            name="skillsRequired"
            placeholder="Enter required skills (e.g. React, Node, MongoDB)"
            value={jobPostData?.skillsRequired}
            onChange={handleChange}
            required
          />
        </section>

        <section className="formSection mt-5 me-4">
          <h3 className="heading">Roles & Responsibilities</h3>
          <textarea
            rows="15"
            name="roleAndResponsibilities"
            placeholder="Enter roles and responsibilities"
            value={jobPostData?.roleAndResponsibilities}
            onChange={handleChange}
            required
          />
        </section>

        <div className="endBtn mt-5 mb-4 w-100 d-flex justify-content-center">
          <button type="submit" className="saveBtn py-1" >
            {isEditPost ? "Update Post" : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
