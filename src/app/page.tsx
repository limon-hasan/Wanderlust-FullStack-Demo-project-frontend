import { Banner } from "@/components/home/banner";
import { CtaBanner } from "@/components/home/CtaBanner";
import { TravelersSay } from "@/components/TravelersSay";
import { WhyChoose } from "@/components/home/why-choose";
import Feature from "@/components/home/Feature";

export default function Home() {
  return (
    <main className="relative">
      <Banner />
      <Feature /> <WhyChoose />
      <TravelersSay />
      <CtaBanner />
    </main>
  );
}
