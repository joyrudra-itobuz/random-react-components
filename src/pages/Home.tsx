import { Link } from "react-router-dom";

const routes = [
  {
    name: "AWS",
    path: "/aws",
  },
  {
    name: "Grains",
    path: "/grains",
  },
];

export default function Home() {
  return (
    <div>
      {routes.map((route) => {
        return (
          <div key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
