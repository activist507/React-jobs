import type { ReactNode } from "react"
import { type Company } from "../data/company"; 

interface Props {
    children?: ReactNode;
    company?: Company;
    title: string;
}

const Aside = ( { children, title, company }: Props) => {
  return (
    <aside>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">{ title }</h3>

            <h2 className="text-2xl">{company?.name}</h2>

            <p className="my-2">{ company?.description}</p>

            <hr className="my-4" />

            <h3 className="text-xl">Contact Email:</h3>

            <p className="my-2 bg-indigo-100 p-2 font-bold">{ company?.contactEmail}</p>

            <h3 className="text-xl">Contact Phone:</h3>

            <p className="my-2 bg-indigo-100 p-2 font-bold">{company?.contactPhone}</p>
        </div>
        { children }
    </aside>
  )
}

export default Aside