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
    <div className="flex items-center justify-center h-screen gap-5">
      {routes.map((route) => {
        return (
          <Link
            className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-xl hover:brightness-125"
            key={route.path}
            to={route.path}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
}
