import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function EditCompanyProfile({
  recruiterData,
  setActiveContent,
  getRecruiterData,
  addMessageBox,
}) {
  const [companyData, setCompanyData] = useState(recruiterData?.company);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log({name, value});

    if (type == "file") {
      setCompanyData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      console.log({parent, child});
      setCompanyData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setComputerData = async (e) => {
    e.preventDefault();
    console.log(companyData);
    const formData = new FormData();
    formData.append("name", companyData.name);
    formData.append("founded", companyData.founded);
    formData.append("employees", companyData.employees);
    formData.append("location", companyData.location);
    formData.append("industry", companyData.industry);
    formData.append("about", companyData.about);
    formData.append("contact", JSON.stringify(companyData.contact));
    if (companyData.logo) {
      formData.append("logo", companyData.logo);
    }

    await fetch(`http://localhost:3200/fileHandle/recruiter`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    getRecruiterData();
    setActiveContent("companyProfile")
    addMessageBox("check", "Profile updated successfully");
  };

  return (
    <div className="editCompanyProfile ps-2">
      <h1 className="pageTitle mt-3">Edit Company Profile</h1>
      <hr className="divider" />
      <button
        className="backBtn fs-5 ms-2 p-1 px-2 mb-3 rounded-3 d-flex align-items-center fw-bold"
        onClick={() => {setActiveContent("companyProfile")}}
        type="button"

      >
        <FaArrowLeft className="me-2" /> BACK
      </button>
      <form className="mainSection" onSubmit={setComputerData}method="post" >
        <section className="formSection">
          <h3 className="heading">Basic Information</h3>

          <div className="formRow">
            <div className="formGroup">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                name="name"
                value={companyData?.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Company Logo</label>
              <input
                type="file"
                accept="image/*"
                name="logo"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Founded</label>
              <input
                type="date"
                name="founded"
                value={companyData?.founded?.split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Employees</label>
              <input
                type="text"
                placeholder="Number of employees"
                name="employees"
                value={companyData?.employees}
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
                placeholder="City or State"
                name="location"
                value={companyData?.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Industry</label>
              <input
                type="text"
                placeholder="Industry type"
                name="industry"
                value={companyData?.industry}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <div className="formRow about">
          <label>About Company</label>
          <textarea
            rows="15"
            placeholder="Write about the company"
            onChange={handleChange}
            name="about"
            value={companyData?.about}
            required
          />
        </div>

        <section className="formSection mt-5">
          <h3 className="heading">Contact Information</h3>

          <div className="formRow">
            <div className="formGroup">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email ID"
                name="contact.emailId"
                value={companyData?.contact?.emailId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Website</label>
              <input
                type="text"
                placeholder="Website URL"
                name="contact.website"
                value={companyData?.contact?.website}
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Twitter</label>
              <input
                type="text"
                placeholder="Twitter URL"
                name="contact.twitter"
                value={companyData?.contact?.twitter}
                onChange={handleChange}
                
              />
            </div>

            <div className="formGroup">
              <label>Facebook</label>
              <input
                type="text"
                placeholder="Facebook URL"
                name="contact.facebook"
                value={companyData?.contact?.facebook}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>LinkedIn</label>
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="contact.linkedin"
                value={companyData?.contact?.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <div className="endBtn mt-5 mb-4 w-100 d-flex justify-content-center">
          <button type="submit" className="saveBtn py-1">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}
