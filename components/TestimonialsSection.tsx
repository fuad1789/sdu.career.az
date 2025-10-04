import { FaStar } from "react-icons/fa";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Leyla Məmmədova",
      position: "Məzun - 2020",
      company: "Azərbaycan Dövlət Neft Şirkəti",
      content:
        "SDU Karyera Mərkəzinin dəstəyi sayəsində mənim karyeramda böyük uğur qazandım. Təcrübə proqramları və məsləhət xidmətləri çox faydalı oldu.",
      avatar: "LM",
    },
    {
      name: "Rəşad Həsənov",
      position: "Məzun - 2019",
      company: "Kapital Bank",
      content:
        "Karyera planlaşdırması və CV hazırlama üzrə aldığım məsləhətlər sayəsində arzuladığım işə düzəldim. Çox təşəkkür edirəm!",
      avatar: "RH",
    },
    {
      name: "Aygün Əliyeva",
      position: "Tələbə - 4-cü kurs",
      company: "İstehsalat Təcrübəsi",
      content:
        "Təcrübə proqramında iştirak etmək mənə çox faydalı oldu. Praktiki bacarıqlarım artdı və gələcək karyeram üçün hazırlaşdım.",
      avatar: "AƏ",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tələbə və Məzun Rəyləri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Karyera Mərkəzimizin xidmətlərindən istifadə edən tələbə və
            məzunlarımızın təcrübələri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sdu-blue rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}
                  </p>
                  <p className="text-sm text-sdu-blue">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
