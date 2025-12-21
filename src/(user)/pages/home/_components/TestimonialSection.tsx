
import { Quote } from 'lucide-react';
import pic1 from "@/assets/home/testimonial/t1.jpg"
import pic2 from "@/assets/home/testimonial/t2.jpg"

const testimonials = [
  {
    quote: "PCR gives us true peace of mind — every pedigree verified, every claim proven. This is the future of canine registration.",
    name: "Elliott",
    role: "Certified Breeder",
    image: pic1,
  },
  {
    quote: "As a veterinarian, I've seen too many false pedigrees. PCR's DNA-based approach is exactly what the industry needs.",
    name: "Evelyn Pollich",
    role: "Veterinary Professional",
    image: pic2, 
  },
  {
    quote: "The verification process was simple and the results were delivered in less than 24 hours. Highly recommend to any serious dog owner.",
    name: "Shanelle",
    role: "Prestige Member & Dog Owner",
    image: pic1,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Thousands</h2>
        <p className="text-slate-600">What breeders, owners, and professionals say about PCR</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div 
            key={index} 
            className="flex flex-col p-6 rounded-2xl border border-[#2B4C8A] bg-[#2B4C8A09]"
          >
            {/* Quote Icon */}
            <Quote className="text-[#D4AF37] mb-4 h-8 w-8 rotate-180 fill-current opacity-50" />
            
            {/* Testimonial Text */}
            <p className="text-slate-700 text-lg font-medium leading-relaxed mb-4 flex-grow">
              "{t.quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-5 mt-auto">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}