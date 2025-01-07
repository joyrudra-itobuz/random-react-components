import "./AnimatedTv.scss";

export default function AnimatedTv() {
  return (
    <div>
      <div className="animated-tv-container relative w-fit mx-auto">
        <div className="absolute z-20 top-0 left-0 w-full h-full">
          <div className="relative tv">
            <img src="/backgrounds/tv.png" alt="tv" className="w-full h-full" />
          </div>

          {/* Reflection */}
          <div className="absolute z-10 top-[100%] left-0 w-full h-full">
            <div className="relative w-full h-full transform perspective-[1000px] rotate-x-[180deg]">
              <img
                src="/backgrounds/tv.png"
                alt="tv-reflection"
                className="w-full h-full opacity-30 blur-[5px] animate-wave"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-[80%] h-[80%] mx-auto my-[10%] overflow-hidden">
          <div className="grainy absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
