import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fields from "../components/Fields";
import { type Listing } from "../data/Listing";
import { API } from "../constants/api";
import BackText from "../components/BackText";

type Params = {
  jobId: string;
};

const AddJobPage = () => {
  const { jobId } = useParams<Params>();
  const [listing, setListing] = useState<Listing>({
    id: "",
    title: "",
    type: "",
    description: "",
    location: "",
    salary: "",
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    if (jobId !== ":jobId") {
      const fetchJob = async () => {
        try {
          const res = await fetch(`${API.baseURL}/jobs/${jobId}`, {
            signal: controller.signal,
          });

          if (res.ok) {
            const data = await res.json();
            setListing(data);
            return;
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchJob();
    }

    return () => {
      controller.abort();
    };
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setListing((prev) => {
      const keys = name.split("."); //["company","contact","phone"]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated = { ...prev } as any;

      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const url =
      jobId === ":jobId"
        ? `${API.baseURL}/jobs`
        : `${API.baseURL}/jobs/${jobId}`;
    const meth = jobId === ":jobId" ? `POST` : `PATCH`;

    try {
      const res = await fetch(url, {
        method: meth,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      console.log("Success:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setListing({
        id: "",
        title: "",
        type: "",
        description: "",
        location: "",
        salary: "",
        company: {
          name: "",
          contactEmail: "",
          contactPhone: "",
          description: "",
        },
      });
    }
  };

  const titleText = jobId === ":jobId" ? "Add" : "Edit";
  // console.log(jobId);

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <BackText />
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              {titleText} Job
            </h2>

            {jobId !== ":jobId" && (
              <Fields
                name="input"
                label="Job ID"
                hasLabel={true}
                inProp={{
                  value: listing.id,
                  onChange: handleChange,
                  id: "id",
                  required: false,
                  type: "text",
                  placeholder: "The edit ID",
                }}
              />
            )}

            <Fields
              name="select"
              label="Job Type"
              hasLabel={true}
              inProp={{
                value: listing.type,
                onChange: handleChange,
                id: "type",
                required: true,
                children: (
                  <>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </>
                ),
              }}
            />

            <Fields
              name="input"
              label="Job Lisitng Name"
              hasLabel={true}
              inProp={{
                value: listing.title,
                onChange: handleChange,
                id: "title",
                required: true,
                type: "text",
                placeholder: "eg. Beautiful Apartment In Miami",
              }}
            />

            <Fields
              name="textarea"
              hasLabel={true}
              label="Description"
              inProp={{
                value: listing.description,
                onChange: handleChange,
                id: "description",
                required: true,
                placeholder:
                  "Add any job duties, expectations, requirements, etc",
              }}
            />

            <Fields
              name="select"
              hasLabel={false}
              inProp={{
                value: listing.salary,
                onChange: handleChange,
                id: "salary",
                required: true,
                children: (
                  <>
                    <option value="Under $50K">Under $50K</option>
                    <option value="$50K - 60K">$50K - $60K</option>
                    <option value="$60K - 70K">$60K - $70K</option>
                    <option value="$70K - 80K">$70K - $80K</option>
                    <option value="$80K - 90K">$80K - $90K</option>
                    <option value="$90K - 100K">$90K - $100K</option>
                    <option value="$100K - 125K">$100K - $125K</option>
                    <option value="$125K - 150K">$125K - $150K</option>
                    <option value="$150K - 175K">$150K - $175K</option>
                    <option value="$175K - 200K">$175K - $200K</option>
                    <option value="Over $200K">Over $200K</option>
                  </>
                ),
              }}
            />

            <Fields
              name="input"
              label="Location"
              hasLabel={true}
              inProp={{
                value: listing.location,
                onChange: handleChange,
                id: "location",
                required: true,
                type: "text",
                placeholder: "Company Location",
              }}
            />

            <h3 className="text-2xl mb-5">Company Info</h3>

            <Fields
              name="input"
              label="Company Name"
              hasLabel={true}
              inProp={{
                value: listing.company.name,
                onChange: handleChange,
                id: "company.name",
                required: true,
                type: "text",
                placeholder: "Company Name",
              }}
            />

            <Fields
              name="textarea"
              label="Company Description"
              hasLabel={true}
              inProp={{
                value: listing.company.description,
                onChange: handleChange,
                id: "company.description",
                required: true,
                placeholder: "What does your company do?",
              }}
            />

            <Fields
              name="input"
              label="Company Email"
              hasLabel={true}
              inProp={{
                value: listing.company.contactEmail,
                onChange: handleChange,
                id: "company.contactEmail",
                type: "text",
                required: true,
                placeholder: "Email address for applicants",
              }}
            />

            <Fields
              name="input"
              label="Company Phone"
              hasLabel={true}
              inProp={{
                value: listing.company.contactPhone,
                onChange: handleChange,
                id: "company.contactPhone",
                type: "tel",
                required: true,
                placeholder: "Optional phone for applicants",
              }}
            />

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {titleText} Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
