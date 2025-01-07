import { FaAnglesRight } from "react-icons/fa6";
import "./Aws.scss";

export default function Aws() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <AmazonCard />
    </div>
  );
}

function AmazonCard() {
  return (
    <div className="amazon-card-wrapper h-[20rem] w-[26rem]">
      <div className="flex h-full flex-col rounded-3xl bg-[#f6f6f9] p-8">
        <h2 className="text-2xl font-[500]">Information and Limitations</h2>
        <p className="mt-2 text-[14px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          exercitationem quibusdam in voluptas sapiente hic iure pariatur sit
          maiores, esse vitae velit ab. Praesentium, laboriosam necessitatibus
          officiis eaque error totam?
        </p>

        <div className="flex w-full flex-grow items-end">
          <div className="arrow-linker flex items-center">
            <p>Explore More</p>
            <div className="h-5 w-1 rounded-full transition-all duration-300" />
            <FaAnglesRight className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
