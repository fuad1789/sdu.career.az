const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const urls = [
  "https://socardownstream.az/az/vacancy/emeliyyat-texnologiyasi-infrastrukturu-uzre-supervayzer",
  "https://socardownstream.az/az/vacancy/biznes-proses-uzre-mutexessis",
  "https://socardownstream.az/az/vacancy/strateji-proqramlarin-akselerasiyasi-uzre-aparici-mutexessis",
  "http://socardownstream.az/az/vacancy/statik-avadanliqlar-uzre-boyuk-muhendis-341",
  "https://socardownstream.az/az/vacancy/elektrik-isleri-uzre-aparici-muhendis-340",
  "https://socardownstream.az/az/vacancy/ise-icaze-uzre-muhendis-339",
  "https://socardownstream.az/az/vacancy/insan-resurslari-emeliyyatlari-uzre-mutexessis",
];

async function scrapeVacancy(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract title
    const titleElement = document.querySelector(
      'h1, .vacancy-title, [class*="title"]'
    );
    const title = titleElement ? titleElement.textContent.trim() : "";

    // Extract description
    const descElement = document.querySelector(
      '.description, .vacancy-description, [class*="description"]'
    );
    const description = descElement ? descElement.textContent.trim() : "";

    // Extract requirements
    const requirements = [];
    const reqElements = document.querySelectorAll(
      '[class*="requirement"], [class*="tələb"], li'
    );
    reqElements.forEach((el) => {
      const text = el.textContent.trim();
      if (text && text.length > 10) {
        requirements.push(text);
      }
    });

    // Extract benefits
    const benefits = [];
    const benefitElements = document.querySelectorAll(
      '[class*="benefit"], [class*="üstünlük"], [class*="advantage"]'
    );
    benefitElements.forEach((el) => {
      const text = el.textContent.trim();
      if (text && text.length > 10) {
        benefits.push(text);
      }
    });

    // Extract dates
    const dateElements = document.querySelectorAll(
      '[class*="date"], [class*="tarix"]'
    );
    let postedDate = "";
    let deadline = "";

    // Extract location, type, salary, experience from meta or specific elements
    const location = "Bakı, Azərbaycan"; // Default
    const type = "Full-time"; // Default
    const salary = ""; // Usually not shown
    const experience = ""; // Extract if available

    return {
      title: title || "Vacancy Title",
      company: "SOCAR Downstream",
      location: location,
      type: type,
      salary: salary || "Müsahibə əsasında",
      experience: experience,
      description: description,
      requirements: requirements.slice(0, 10), // Limit to 10
      benefits: benefits.slice(0, 10), // Limit to 10
      postedDate: postedDate || new Date().toISOString().split("T")[0],
      deadline: deadline || "",
      status: "Aktiv",
      applicationLink: url,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function main() {
  const results = [];
  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    const data = await scrapeVacancy(url);
    if (data) {
      results.push(data);
    }
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);


