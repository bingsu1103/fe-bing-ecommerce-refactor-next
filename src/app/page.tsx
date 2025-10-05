import Hero from "@/components/home/Hero";
import Feature from "@/components/home/Feature";
import Categories from "@/components/home/Categories";
import FeatureProduct from "@/components/home/FeatureProduct";

// Mock data

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      {/* Features */}
      <Feature />
      {/* Categories */}
      <Categories />
      {/* Featured Products */}
      <FeatureProduct />
    </div>
  );
}
