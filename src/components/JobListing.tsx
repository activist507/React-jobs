import { NavLink } from "react-router-dom";
import { useState } from "react";
import type { Listing } from "../data/Listing";
import { FaMapMarker } from "react-icons/fa";

const JobListing = ({
  id,
  type,
  title,
  description,
  salary,
  location,
}: Listing) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  let tweakDesc = description;

  if (!showFullDesc) {
    tweakDesc = description.substring(0, 60) + "  .........";
  }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{type}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>

        <div className="mb-5">{tweakDesc}</div>

        <button
          className="btn text-indigo-500 mb-2 hover:text-indigo-600"
          onClick={() => {
            setShowFullDesc(!showFullDesc);
          }}
        >
          {showFullDesc ? "Less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2">{salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-400 mb-3">
            <FaMapMarker className="inline text-lg mb-1" />
            {location}
          </div>
          <NavLink
            to={`/jobs/${id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
