import React, {useState,useEffect} from "react";
import { FaSearch, FaUser, FaFilePdf } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { dateFormat } from "../utils/dateFormat";

function JobApplicants({
  recruiterData,
  setJobSeekerData,
  setActiveContent,
  addMessageBox,
  setJobSeekerJobPost,
}) {

  const [usedData,SetUsedData]=useState([]);
  const [filterData, setFilterData] = useState([]);
  const API_URL= import.meta.env.VITE_API_URL;


  useEffect(()=>{

    const temp = []
    recruiterData.jobPosted.forEach((data1) => {
      data1.applications.forEach((data2) => {
        temp.push({
        applicantName:data2.applicant.userName,
        jobTitle:data1.role,
        appliedAt:data2.appliedAt,
        status:data2.status,
        jobId:data1._id,
        applicantId:data2.applicant._id,
        resume:data2.applicant?.personalInfo?.resume,
        });
      })
    })

    SetUsedData(temp);
    setFilterData(temp);
    
  },[recruiterData]);

  const [searchData, setSearchData] = useState({
    jobTitle: "",
    applicantName: "",
    status: "",
  });

  const changeHandler = (e) => {
    console.log(`${e.target.name} = ${e.target.value}`);
    setSearchData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => {

    if (searchData.jobTitle == "" && searchData.applicantName == "" && searchData.status == "") {
      setFilterData(usedData);
      return;
    }

    const timer = setTimeout(() => {
      const data = usedData?.filter((value) => {
        const jobTitleMatch = value.jobTitle
          .toLowerCase()
          .startsWith(searchData.jobTitle.toLowerCase().trim());
        const applicantNameMatch=value.applicantName?.toLowerCase()
          .startsWith(searchData.applicantName.toLowerCase().trim());
        const statusMatch =(
          searchData.status == value.status ||
          searchData.status == "" );
          

        return jobTitleMatch && applicantNameMatch && statusMatch;
      });
      console.log(data);
      setFilterData(data);
    }, 800);

    return () => clearTimeout(timer);
    
  }, [searchData, usedData]);

  let sno = 1;

  async function getJobSeekerData(jobSeekerId) {
    await fetch(`${API_URL}/recruiter/jobSeeker/${jobSeekerId}`)
      .then((res) => res.json())
      .then((data) => {

        setJobSeekerData(data);
        setActiveContent("jobSeekerProfile");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="Applicants container my-4">
      <h2 className="mt-3 pageTitle">Job Applicants</h2>
      <hr className="my-3" />
      <div className="filterBox mb-3 d-flex justify-content-end gap-2">
        <div className="field jobTitleBox d-flex align-items-center">
          <FaSearch className="icon ms-1 me-2 fs-4" />
          <input type="text" placeholder="Job Title" name="jobTitle" onChange={changeHandler} />
        </div>
        <div className="field jobTitleBox d-flex align-items-center ms-2">
          <FaUser className="icon ms-1 me-2 fs-4" />
          <input type="text" placeholder="Applicant Name" name="applicantName" onChange={changeHandler} />
        </div>

        <div className="field filter d-flex align-items-center ms-2">
          <MdFilterListAlt className="icon fs-1" />
          <select onChange={changeHandler} name="status">
            <option value="" defaultChecked >Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="tableBox">
        <table className="table position-relative">
          <thead>
            <tr className="position-sticky top-0 headerRow ">
              <th>S.No</th>
              <th>Applicant Name</th>
              <th>Role</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterData.map((data) => (
                <tr key={sno}>
                  <td>{sno++}</td>
                  <td>{data.applicantName}</td>
                  <td>{data.jobTitle}</td>
                  <td>{dateFormat(data.appliedAt)}</td>
                  <td>
                    <span className={`status ${data.status} text-capitalize`}>
                      {data.status}
                    </span>
                  </td>
                  <td className="actionBox ">
                    <div className="d-flex justify-content-evenly">
                      <button
                        className="profileBtn"
                        onClick={() => {
                          setJobSeekerJobPost({
                            jobId: data.jobId,
                            jobStatus: data.status,
                            jobSeekerId: data.applicantId,
                          });
                          getJobSeekerData(data.applicantId);
                        }}
                      >
                        <FaUser className="icon" /> Profile
                      </button>
                      <button
                        className="resumeBtn"
                        onClick={(e) => {
                          if (!data.resume) {
                            e.preventDefault();
                            addMessageBox("warning", "Resume not uploaded");
                          }
                        }}
                      >
                        <a
                          className="text-decoration-none d-flex align-items-center"
                          href={`${API_URL}/upload/${data.resume}`}
                          target="_blank"
                          download="Resume.pdf"
                        >
                          <FaFilePdf className="icon fs-5 me-1" />
                          Resume
                        </a>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobApplicants;
