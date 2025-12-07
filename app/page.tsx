import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <section
        id="home"
        className="min-h-screen mt-15 sm:mt-0 flex items-center justify-center bg-gray-50 px-6 sm:px-10 md:px-20"
      >
        <div className="flex items-center justify-center  w-full">
          <div className="flex flex-col space-y-8 text-center">
            <h6 className="text-orange-600 text-base sm:text-lg opacity-80">
              Streamline smarter. Achieve faster
            </h6>
            <h3 className="text-black font-bold text-4xl sm:text-5xl md:text-6xl ">
              Organize Your Life <br className="hidden sm:block" />
            </h3>
            <h3 className="text-orange-600 font-bold text-4xl sm:text-5xl md:text-6xl">
              In Record Time With RapidList
            </h3>
            <h6 className="mt-3 text-orange-600 text-base sm:text-lg opacity-80">
              A modern platform that simplifies tasks, boosts focus, and drives
              results.
            </h6>
          </div>
        </div>
      </section>
    </main>
  );
}
