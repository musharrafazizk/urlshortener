import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#f4f4f5",
            border: "1px solid #3f3f46",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#a78bfa", secondary: "#18181b" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#18181b" },
          },
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
