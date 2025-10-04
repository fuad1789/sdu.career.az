import Link from "next/link";

interface TecrubeCardProps {
  title: string;
  description: string;
  href: string;
  features: string[];
  icon: string;
}

export default function TecrubeCard({
  title,
  description,
  href,
  features,
  icon,
}: TecrubeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">{icon}</span>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>

        <p className="text-gray-600 mb-6">{description}</p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 bg-sdu-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ətraflı Məlumat
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
