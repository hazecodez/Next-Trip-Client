import { useNavigate } from "react-router-dom";

export default function NavLinks({
  link,
  name,
}: {
  link: string;
  name: string;
}) {
  const navigate = useNavigate();
  return (
    <>
      <li>
        <a onClick={() => navigate(link)}> {name} </a>
      </li>
    </>
  );
}
