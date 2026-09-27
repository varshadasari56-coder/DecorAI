import {
  ArrowRight,
  Sparkles,
  WandSparkles,
  ShoppingBag,
  ShieldCheck,
  Play,
  Cake,
  Heart,
  PartyPopper,
  Gift,
  BriefcaseBusiness,
} from "lucide-react";

function Home() {
  return (
    <main className="overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="bg-[#f8f7ff]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">

            {/* Small badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet-600 shadow-sm">
              <Sparkles size={15} />
              AI-Powered Decoration Ideas
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#171536] sm:text-5xl lg:text-[58px]">

              Turn Your Inspiration
              <br />

              Into Beautiful
              <br />

              <span className="text-violet-600">
                Decorations
              </span>

            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Upload a decoration image, let our AI analyze it, and get a
              personalized decoration plan with products that fit your
              occasion and budget.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              <a
                href="/ai-analyzer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
              >
                Get Started
                <ArrowRight size={18} />
              </a>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                  <Play size={14} fill="currentColor" />
                </span>

                Watch How It Works
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-300/30 blur-3xl" />

            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl" />

            {/* Image Card */}
            <div className="relative mx-auto max-w-[570px] overflow-hidden rounded-[28px] border border-white bg-white p-3 shadow-2xl shadow-violet-100">

              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85"
                alt="Beautiful decoration setup"
                className="h-[350px] w-full rounded-[22px] object-cover sm:h-[430px]"
              />

              {/* AI floating card */}
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <WandSparkles size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      AI-Powered Decoration Ideas
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Personalized for your style & budget
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURE STRIP
      ====================================================== */}
      <section className="border-y border-gray-100 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon={<WandSparkles size={20} />}
            title="AI Analysis"
            description="Understand your style"
          />

          <FeatureCard
            icon={<Sparkles size={20} />}
            title="Personalized Kits"
            description="Tailored to your budget"
          />

          <FeatureCard
            icon={<ShoppingBag size={20} />}
            title="Wide Selection"
            description="Premium quality products"
          />

          <FeatureCard
            icon={<ShieldCheck size={20} />}
            title="Secure Checkout"
            description="Safe & reliable shopping"
          />

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section
        id="how-it-works"
        className="bg-[#f8f7ff] px-5 py-20 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#171536] sm:text-4xl">
              How DecorAI Works
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              From inspiration to a complete decoration kit in just a few
              simple steps.
            </p>

          </div>


          {/* Steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <StepCard
              number="01"
              icon={<ShoppingBag size={24} />}
              title="Upload Inspiration"
              description="Upload a photo of any decoration you love from your gallery or device."
            />

            <StepCard
              number="02"
              icon={<WandSparkles size={24} />}
              title="AI Analyzes It"
              description="Our AI identifies the theme, colors, style and decoration elements."
            />

            <StepCard
              number="03"
              icon={<Sparkles size={24} />}
              title="Get Your Kit"
              description="Receive personalized products that match your design and budget."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR OCCASIONS
      ====================================================== */}
      <section
        id="shop"
        className="bg-white px-5 py-20 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#171536]">
                Popular Occasions
              </h2>

            </div>

            <a
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-700"
            >
              View all
              <ArrowRight size={16} />
            </a>

          </div>


          {/* Occasion cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            <OccasionCard
              icon={<Cake size={22} />}
              title="Birthday"
            />

            <OccasionCard
              icon={<Heart size={22} />}
              title="Wedding"
            />

            <OccasionCard
              icon={<Heart size={22} />}
              title="Anniversary"
            />

            <OccasionCard
              icon={<PartyPopper size={22} />}
              title="Festival"
            />

            <OccasionCard
              icon={<Gift size={22} />}
              title="Baby Shower"
            />

            <OccasionCard
              icon={<BriefcaseBusiness size={22} />}
              title="Corporate"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section
        id="about"
        className="bg-white px-5 pb-20 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-14 text-center text-white sm:px-12">

            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">

              <Sparkles
                className="mx-auto mb-5"
                size={28}
              />

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Ready to create your decoration?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
                Upload your inspiration and let DecorAI turn it into a
                personalized decoration shopping experience.
              </p>

              <a
                href="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition hover:bg-violet-50"
              >
                Start Creating
                <ArrowRight size={17} />
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 border-gray-100 px-5 py-6 sm:border-b lg:border-b-0 lg:border-r lg:px-6 last:border-r-0">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

    </div>
  );
}


/* =========================================================
   STEP CARD
========================================================= */

function StepCard({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          {icon}
        </div>

        <span className="text-5xl font-black text-violet-100">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   OCCASION CARD
========================================================= */

function OccasionCard({ icon, title }) {
  return (
    <a
      href="/shop"
      className="group flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-md"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition duration-300 group-hover:bg-violet-600 group-hover:text-white">
        {icon}
      </div>

      <span className="mt-3 text-sm font-semibold text-gray-700">
        {title}
      </span>

    </a>
  );
}


export default Home;