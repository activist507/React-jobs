import type { ReactNode } from 'react';

interface Props{
  children?: ReactNode;
  bg?: string;
  margin?: string;
}

const Card = ( { children, bg = 'bg-gray-100' }: Props ) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md mt-4`}> { children }</div>
  )
}

export default Card