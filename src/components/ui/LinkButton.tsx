import { Link } from 'react-router-dom';
import { Button } from './button';


const LinkButton = ({ to, children }:{ to:any, children :any}) =>{
  return <Link to={to}><Button variant="outline" className='px-2'>{children}</Button></Link>;
}

export const LinkTo = ({ to, children }:{ to:any, children :any}) =>{
  return <Link to={to} className='font-normal hover:text-white w-full'>{children}</Link>;
}

export default LinkButton;