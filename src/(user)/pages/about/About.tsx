import { useEffect } from "react";


export default function AboutPage() {

    useEffect(() => {
      window.location.replace("https://pcr-97abfd.webflow.io/about");
    }, []);

  return (
     <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-50">
  <div className="flex flex-col items-center gap-4">
    {/* Spinner */}
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

    {/* Redirecting text */}
    <p className="text-gray-700 text-lg font-medium">
      Redirecting you to our Contact page…
    </p>
    <p className="text-gray-500 text-sm">
      If you are not redirected automatically,{" "}
      <a
        href="https://pcr-97abfd.webflow.io/about"
        className="text-blue-600 underline"
      >
        click here
      </a>.
    </p>
  </div>
</div>
  );
}
