import "./AnimatedTv.scss";

export default function AnimatedTv() {
  return (
    <div className="animated-tv-container relative">
      <div className="grainy" />
      <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center text-6xl font-bold text-white">
        <p className="text-center text-red-600">
          <span className="text-6xl">LOADS</span>
          <span className="text-4xl ml-2">
            of <br />
          </span>
          <em className="text-8xl underline">GRAINS</em>
        </p>
      </div>
    </div>
  );
}
