import { NavLink } from 'react-router-dom'

const BackText = () => {
  return (
    <section>
        <div className="container m-auto py-6 px-6">
            <NavLink
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
            >
            <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
            </NavLink>
        </div>
    </section>
  )
}

export default BackText