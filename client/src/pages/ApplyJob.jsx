import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import kconvert from 'k-convert';
import moment from 'moment';
import Footer from '../components/Footer';

const ApplyJob = () => {
  const { id } = useParams(); // Get job ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [JobData, setJobData] = useState(null); // State for the selected job data
  const { jobs } = useContext(AppContext); // Access jobs from AppContext

  // Function to fetch the specific job data
  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]); // Set the fetched job data
      console.log(data[0]);
    }
  };

  // Trigger fetchJob whenever jobs or id changes
  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  // Return Loading component if JobData is null
  if (!JobData) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Job Header */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId.image}
                alt={JobData.companyId.name}
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{JobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="Company" />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="Location" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="Level" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="Salary" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button className="bg-blue-600 p-2.5 px-10 text-white rounded">Apply Now</button>
              <p className="mt-1 text-gray-600">Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* Left Section */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <button className="bg-blue-600 p-2.5 px-10 text-white rounded mt-10">
                Apply Now
              </button>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
  <h2 className="font-bold text-xl mb-4">
    More jobs from {JobData.companyId.name}
  </h2>
  <div className="flex flex-col gap-4">
    {jobs
      .filter(
        (job) =>
          job._id !== JobData._id &&
          job.companyId._id === JobData.companyId._id
      )
      .filter(job => true).slice(0,4)
      .map((job) => (
        <div
          key={job._id}
          className="border rounded-lg p-6 bg-white shadow-sm flex items-start gap-6"
        >
          <img
            className="h-20 w-20 rounded-lg border"
            src={job.companyId.image}
            alt={job.title}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.location}</p>
            <button
              onClick={() => {
                navigate(`/apply-job/${job._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
            >
              Apply now
            </button>
            <button
              onClick={() => {
                navigate(`/apply-job/${job._id}`);
                window.scrollTo(0, 0);
              }}
              className="text-gray-500 border border-gray-500 rounded px-6 py-3 mt-2"
            >
              Learn more
            </button>
          </div>
        </div>
      ))}
  </div>
</div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ApplyJob;
