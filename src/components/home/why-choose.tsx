import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="bg-[#ebf8fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-[#111315] sm:text-4xl md:text-[42px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-[#4b5563] sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-8 sm:p-10 shadow-sm"
            >
              <div className="size-10 flex items-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="size-8 object-contain"
                />
              </div>

              <h3 className="mt-8 text-xl font-normal text-[#111315]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
