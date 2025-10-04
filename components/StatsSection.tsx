import {
  FaUsers,
  FaBuilding,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Tələbə",
      description: "İllik təcrübə proqramlarında iştirak edən tələbələr",
      icon: FaUsers,
    },
    {
      number: "50+",
      label: "Müəssisə",
      description: "Əməkdaşlıq etdiyimiz müəssisələr",
      icon: FaBuilding,
    },
    {
      number: "200+",
      label: "Məzun",
      description: "Uğurlu karyera yolu quran məzunlar",
      icon: FaUserGraduate,
    },
    {
      number: "95%",
      label: "Məşğulluq",
      description: "Məzunlarımızın məşğulluq nisbəti",
      icon: FaBriefcase,
    },
  ];

  return (
    <section className="py-16 bg-sdu-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Rəqəmlərlə SDU Karyera Mərkəzi
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Uğurlarımızı rəqəmlərlə nümayiş etdiririk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-200">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
