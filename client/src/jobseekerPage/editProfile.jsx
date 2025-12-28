import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaArrowLeft } from "react-icons/fa6";
import { MdAddTask } from "react-icons/md";

function EditProfile({
  setActiveContent,
  JobSeekerData,
  fetchData,
  addMessageBox,
}) {
  const [editData, setEditData] = useState({
    name: JobSeekerData?.name || "",
    jobTitle: JobSeekerData.personalInfo?.jobTitle || "",
    city: JobSeekerData.personalInfo?.city || "",
    email: JobSeekerData.personalInfo?.email || "",
    phone: JobSeekerData.personalInfo?.phone || "",
    languages: JobSeekerData.personalInfo?.languages || "",
    instagram: JobSeekerData.personalInfo?.instagram || "",
    twitter: JobSeekerData.personalInfo?.twitter || "",
    website: JobSeekerData.personalInfo?.website || "",
    aboutMe: JobSeekerData.personalInfo?.aboutMe || "",
    skills: JobSeekerData.personalInfo?.skills?.join(", ") || "",
    experience: JobSeekerData.personalInfo?.experience || [],
    education: JobSeekerData.personalInfo?.education || [],
  });

  const handleChangeEditData = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emptyExperienceData = {
    experienceJobTitle: "",
    companyName: "",
    experienceCity: "",
    jobType: "",
    jobPeriod: "",
    experienceDetails: "",
  };

  const [experienceData, setExperienceData] = useState(emptyExperienceData);

  const handleChangeExperienceData = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);
    setExperienceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperienceData = () => {
    console.log(`experience: ${experienceData}`);
    setEditData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          ["jobTitle"]: experienceData.experienceJobTitle,
          ["companyName"]: experienceData.companyName,
          ["city"]: experienceData.city,
          ["jobType"]: experienceData.jobType,
          ["jobPeriod"]: experienceData.jobPeriod,
          ["details"]: experienceData.experienceDetails,
        },
      ],
    }));
    setExperienceData(emptyExperienceData);
  };

  const deleteExperienceData = (index) => {
    setEditData((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i != index),
    }));
  };

  const emptyEducationData = {
    educationInstitute: "",
    educationYear: "",
    educationDegree: "",
    educationCity: "",
    educationDetails: "",
  };

  const [educationData, setEducationData] = useState(emptyEducationData);

  const handleChangeEducationData = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);
    setEducationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEducationData = () => {
    console.log(`education: ${educationData}`);
    setEditData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          ["institute"]: educationData.educationInstitute,
          ["year"]: educationData.educationYear,
          ["degree"]: educationData.educationDegree,
          ["city"]: educationData.educationCity,
          ["details"]: educationData.educationDetails,
        },
      ],
    }));
    setEducationData(emptyEducationData);
  };

  const deleteEducationData = (index) => {
    setEditData((prev) => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i != index),
    }));
  };

  const [uploadFiles, setUploadFiles] = useState({
    resume: null,
    profilePhoto: null,
    banner: null,
  });

  const handleFiles = (e) => {
    const { name, files } = e.target;
    console.log(`${name} : ${files[0]}`);
    setUploadFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const saveEditData = async () => {
    var data = { ...editData };
    data.skills = data.skills
      .split(",")
      .map((info) => info.trim())
      .filter((info) => info != "");
    // console.log(data);

    await fetch("http://localhost:3200/jobseeker/editProfile", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

    const fileData = new FormData();
    Object.entries(uploadFiles).forEach(([key, file]) => {
      if (file) {
        // console.log(key, file);
        fileData.append(key, file);
      }
    });

    // console.log([...fileData.entries()]);

    await fetch("http://localhost:3200/fileHandle/jobseeker", {
      method: "PUT",
      body: fileData,
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

    // console.log("feachData");
    console.log("test line");
    fetchData();
    setActiveContent("profile");
    console.log("change to profile");
    addMessageBox("check", "Profile updated successfully.");
  };

  return (
    <div className="editProfile ps-2">
      <h1 className="pageTitle">Edit Profile</h1>
      <hr className="divider" />
      <button
        className="backBtn fs-5 ms-2 p-1 px-2 mb-3 rounded-3 d-flex align-items-center fw-bold"
        onClick={() => setActiveContent("profile")}
      >
        <FaArrowLeft className="me-2" />
        BACK
      </button>
      <div>
        <section className="formSection">
          <h3 className="heading">Personal Information</h3>
          <div className="formRow d-flex">
            <div className="formGroup d-flex flex-column ">
              <label>Name</label>
              <input
                type="text"
                name="formName"
                value={editData.name}
                className="text-white"
                disabled
              />
            </div>
            <div className="formGroup d-flex flex-column">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Your job title"
                value={editData.jobTitle}
                onChange={handleChangeEditData}
              />
            </div>
          </div>

          <div className="formRow d-flex ">
            <div className="formGroup d-flex flex-column">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Your city"
                value={editData.city}
                onChange={handleChangeEditData}
              />
            </div>
            <div className="formGroup d-flex flex-column">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={editData.email}
                onChange={handleChangeEditData}
              />
            </div>
          </div>

          <div className="formRow d-flex">
            <div className="formGroup d-flex flex-column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                value={editData.phone}
                onChange={handleChangeEditData}
              />
            </div>
            <div className="formGroup d-flex flex-column">
              <label>Languages</label>
              <input
                type="text"
                name="languages"
                placeholder="English, Hindi, etc."
                value={editData.languages}
                onChange={handleChangeEditData}
              />
            </div>
          </div>

          <div className="formRow d-flex">
            <div className="formGroup d-flex flex-column">
              <label>Instagram</label>
              <input
                type="text"
                name="instagram"
                placeholder="@yourhandle"
                value={editData.instagram}
                onChange={handleChangeEditData}
              />
            </div>

            <div className="formGroup d-flex flex-column">
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                placeholder="@yourhandle"
                value={editData.twitter}
                onChange={handleChangeEditData}
              />
            </div>
          </div>

          <div className="formRow d-flex">
            <div className="formGroup d-flex flex-column">
              <label>Website</label>
              <input
                type="url"
                name="website"
                placeholder="https://yourwebsite.com"
                value={editData.website}
                onChange={handleChangeEditData}
              />
            </div>
          </div>
        </section>

        <section className="formSection uploadBox mt-5">
          <h3 className="heading">Uploads</h3>
          <div className="formRow pe-5 mt-3">
            <div className="formGroup gap-1">
              <label>Resume (PDF) :</label>
              <input
                type="file"
                name="resume"
                accept="application/pdf"
                onChange={handleFiles}
              />
            </div>
            <div className="formGroup gap-1">
              <label>Profile Photo :</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFiles}
              />
            </div>
            <div className="formGroup gap-1">
              <label>Banner Image :</label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleFiles}
              />
            </div>
          </div>
        </section>

        <section className="formSection mt-5">
          <h3 className="heading">About Me</h3>
          <textarea
            className="mt-3"
            name="aboutMe"
            rows="6"
            placeholder="Write something about yourself..."
            value={editData.aboutMe}
            onChange={handleChangeEditData}
          />
        </section>

        <section className="formSection mt-5">
          <h3 className="heading">Skills</h3>
          <textarea
            name="skills"
            rows="3"
            className="mt-3"
            placeholder="React, Node, MongoDB..."
            value={editData.skills}
            onChange={handleChangeEditData}
          />
        </section>

        <section className="Section mt-5 position-relative p-0">
          <button
            className="addBtn position-absolute"
            onClick={addExperienceData}
          >
            <MdAddTask className=" addEducationIcon" />
          </button>
          <h3 className="heading">Experience </h3>
          <div className="filledExperience d-flex flex-wrap mt-4 gap-2">
            {editData.experience.map((data, index) => (
              <div className="Tag px-3 py-2 fs-5 d-flex align-items-center">
                {data.jobTitle}
                <ImCross
                  className="cancelIcon fs-6 ms-3"
                  onClick={() => {
                    console.log(index);
                    deleteExperienceData(index);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Job Title</label>
              <input
                type="text"
                name="experienceJobTitle"
                placeholder="Job title"
                value={experienceData.experienceJobTitle}
                onChange={handleChangeExperienceData}
              />
            </div>
            <div className="formGroup">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Company name"
                value={experienceData.companyName}
                onChange={handleChangeExperienceData}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>City</label>
              <input
                type="text"
                name="experienceCity"
                placeholder="City"
                value={experienceData.experienceCity}
                onChange={handleChangeExperienceData}
              />
            </div>
            <div className="formGroup">
              <label>Job Type</label>
              <select
                name="jobType"
                value={experienceData.jobType}
                onChange={handleChangeExperienceData}
              >
                <option value="Remote">Remote</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Job Period</label>
              <input
                type="text"
                name="jobPeriod"
                placeholder="e.g. Jan 2022 - Dec 2023"
                value={experienceData.jobPeriod}
                onChange={handleChangeExperienceData}
              />
            </div>
            <div className="formGroup">
              <label>Details</label>
              <textarea
                name="experienceDetails"
                rows="4"
                placeholder="Describe your role and responsibilities"
                value={experienceData.experienceDetails}
                onChange={handleChangeExperienceData}
              />
            </div>
          </div>
        </section>

        <section className="Section mt-5 position-relative p-0">
          <button
            className="addBtn position-absolute"
            onClick={addEducationData}
          >
            <MdAddTask className=" addEducationIcon" />
          </button>

          <h3 className="heading">Education</h3>
          <div className="fillEducation d-flex flex-wrap mt-4 gap-2">
            {editData.education.map((data, index) => (
              <div className="Tag px-3 py-2 fs-5 d-flex align-items-center">
                {data.degree}
                <ImCross
                  className="cancelIcon fs-6 ms-3"
                  onClick={() => deleteEducationData(index)}
                />
              </div>
            ))}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>School / College Name</label>
              <input
                type="text"
                name="educationInstitute"
                placeholder="Institute name"
                value={educationData.educationInstitute}
                onChange={handleChangeEducationData}
              />
            </div>
            <div className="formGroup">
              <label>Year</label>
              <input
                type="text"
                name="educationYear"
                placeholder="e.g. 2018-2021"
                value={educationData.educationYear}
                onChange={handleChangeEducationData}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Degree / Course</label>
              <input
                type="text"
                name="educationDegree"
                placeholder="Degree or course"
                value={educationData.educationDegree}
                onChange={handleChangeEducationData}
              />
            </div>
            <div className="formGroup">
              <label>City</label>
              <input
                type="text"
                name="educationCity"
                placeholder="City"
                value={educationData.educationCity}
                onChange={handleChangeEducationData}
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Details</label>
            <textarea
              name="educationDetails"
              rows="4"
              placeholder="Education details"
              value={educationData.educationDetails}
              onChange={handleChangeEducationData}
            />
          </div>
        </section>

        <div className="endBtn mt-5 mb-4 w-100 d-flex">
          <button className="saveBtn py-1" onClick={saveEditData}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
