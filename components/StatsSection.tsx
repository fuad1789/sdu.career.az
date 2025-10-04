import {
  FaUsers,
  FaBuilding,
  FaUserGraduate,
  FaBriefcase,
} from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      number: "150+",
      label: "Tələbə",
      description: "2024-cü ildə təcrübə proqramlarında iştirak edən tələbələr",
      icon: FaUsers,
    },
    {
      number: "25+",
      label: "Tərəfdaş",
      description: "Sumqayıt və Bakıda əməkdaşlıq etdiyimiz şirkətlər",
      icon: FaBuilding,
    },
    {
      number: "85%",
      label: "Məşğulluq",
      description: "Məzunlarımızın 6 ay ərzində işə düzəlmə nisbəti",
      icon: FaBriefcase,
    },
    {
      number: "12",
      label: "İl",
      description: "Karyera Mərkəzinin fəaliyyət göstərdiyi illər",
      icon: FaUserGraduate,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-sdu-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            SDU Karyera Mərkəzinin Uğurları
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto px-4">
            Tələbələrin karyera inkişafında əldə etdiyimiz nəticələr
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold text-blue-100 mb-1 sm:mb-2">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-blue-200 leading-tight">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
