import { useNavigate } from "react-router-dom";

export default function NavLinks({
  link,
  name,
  color,
}: {
  link: string;
  name: string;
  color: string;
}) {
  const navigate = useNavigate();
  return (
    <>
      <li className={`text-${color} text-lg`}>
        <a onClick={() => navigate(link)}> {name} </a>
      </li>
    </>
  );
}
