import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6";
import type { Listing } from "../data/Listing";
import Card from '../components/Card'
import Aside from "../components/Aside"
import BackText from "../components/BackText";
import { API } from "../constants/api";
import Loading from "../components/Loading";

type Params = {
    jobId: string;
}


const JobPage = () => {
    const [job,setJob] = useState<Listing>( { id:"", title:"", type:"", description:"", location:"", salary:"", company:{name:"",contactEmail:"",contactPhone:"",description:""} } )
    const [isLoading,setIsLoading] = useState( true );
    const [error,setError] = useState<string | null>(null);
    const { jobId } = useParams<Params>();
    const navigate = useNavigate();

    useEffect( () => {
        const controller = new AbortController();

        const fetchJob = async () => {
            try{
                const res = await fetch(`${API.baseURL}/jobs/${jobId}`, { signal: controller.signal } );

                if(!res.ok) throw new Error( `HTTP error! status: ${res.status}` );
                const data: Listing = await res.json();
                setJob( data );
            } catch (err) {
                if( err instanceof DOMException && err.name == 'AbortError' ) return ;
                setError( err instanceof Error ? err.message : "Something went wrong" );
            } 
        }
        fetchJob();

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            controller.abort();
            clearTimeout( timer )
        }
    },[ jobId ]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const controller = new AbortController();
        const { value } = e.currentTarget;
        // console.log( value )
        const res = await fetch(`${API.baseURL}/jobs/${value}`,{
            signal: controller.signal,
            method: 'DELETE',
        });

        if(!res.ok) return console.log(`Something went wrong status: ${res.status}`); 

        navigate('/jobs',{ replace: true} );
    }

    if( isLoading ) return <Loading name="balltriangle"/>;

    if( error )  return <p>Error: {error}</p>; 

    if (!job) 
        return (
            <Card>
                <BackText />
                <strong>There are no Job with such ID.</strong>
            </Card>
        );

    const { id, title, type, description, location, salary, company } = job ;

    return (
        <>
            <BackText />

            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <Card bg="bg-blue-100">
                                <div className="text-gray-500 mb-4">{ type }</div>
                                <h1 className="text-3xl font-bold mb-4"> { title }</h1>
                                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                    <FaLocationDot className="mr-2"/>
                                    <p className="text-orange-700">{ location}</p>
                                </div>
                            </Card>

                            <Card bg="bg-indigo-200" margin="5">
                                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                    Job Description
                                </h3>

                                <p className="mb-4"> { description }</p>

                                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                                <p className="mb-4">{ salary } / Year</p>
                            </Card>
                        </main>

                        <Aside title="Company Info" company={ company }>
                            <Card margin="6">
                                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                <NavLink
                                    to={`/add-job/${id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >Edit Job
                                </NavLink>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    onClick={ handleClick }
                                    value={ id }
                                >
                                    Delete Job
                                </button>
                            </Card>
                        </Aside>
                    </div>
                </div>
            </section>
        </>
    )
}

export default JobPage