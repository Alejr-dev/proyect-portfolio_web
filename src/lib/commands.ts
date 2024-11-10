import { Prompt } from "../types";

export const MOTD = `Welcome to Alejr-dev portfolio!

GitHub:  &nbsp;&nbsp;<a href="https://github.com/Alejr-dev" target="_blank" rel="noopener noreferrer">https://github.com/Alejr-dev</a>
LinkedIn: <a href="https://www.linkedin.com/in/alejandro-prieto-990b8628b/" target="_blank" rel="noopener noreferrer">https://linkedin.com/alejandro_prieto</a>

Hello, I'm <b>Alejandro Prieto</b>, a 20-year-old <b>Computer Engineering student</b>. I specialize 
in <b>Oracle APEX</b>, <b>Java</b>, <b>C#</b>, and <b>PL/SQL</b> development. I have a strong passion for 
<b>technology</b> and always strive to learn and innovate in every project I undertake.

Type 'help' to see the available commands.`.replace(/\n/g, "<br/>");

const TECH_STACK = `<a href="https://github.com/Alejr-dev/github-readme-tech-stack" target="_blank"><img src="https://www.aalpha.net/wp-content/uploads/2020/12/full-stack-development.gif" alt="Tech Stack" /></a>`;

const COMMANDS: Record<
  string,
  (username: string, args: string[], history: string[]) => string
> = {
  cv: () => openLink("https://link-to-cv.pdf"),
  whoami: () => `
  I am a highly perseverant, disciplined, and committed person—probably one of the few faithful men left in the world. I've always been drawn to technology and innovation. At 16, I took my first steps in programming by learning SQL (don’t ask why I started with that!), and since then, I've kept diving deeper into this vast universe.
  
  In addition to programming, I am a semi-professional drone racing pilot, which has greatly sharpened my focus and control skills. After high school, I explored a career far from the tech world but soon realized my true passion lay in technology. I left that path to follow my calling, with the goal of creating something meaningful and useful for the world.
  
  I am calm and never lose control, even in complex situations. I firmly believe in teamwork as the driving force behind every achievement. Technology is one of my greatest passions, especially in the fields of robotics and automotive engineering. I am also an avid Formula 1 fan—a sport that embodies everything I admire: precision, speed, and innovation. I am very social and adapt easily to any plan (invite me!). I aspire to make a positive impact in my community and leave my mark. And though I won’t say it out loud, people claim I tell "great" jokes (well, maybe not so much).`,

  motd: () => MOTD,
  instagram: () => openLink("https://www.instagram.com/alejandroprietxx/"),
  date: () => new Date().toLocaleDateString(),
  github: () => openLink("https://github.com/Alejr-dev"),
  linkedin: () => openLink("https://www.linkedin.com/in/alejandro-prieto-990b8628b/"),
  latestProject: () => openLink("https://script-repository.netlify.app/"),
  email: () => openLink("mailto:alejrprieto@outlook.com"), 
  techstack: () => TECH_STACK,
  about: (username) => `Hello, ${username}!,
    I specialize in <b>backend development</b> and technologies like <b>Oracle APEX</b> and <b>Database Administration</b>, delivering scalable and efficient solutions. Currently, I am working at one of the most prominent software development companies in Paraguay, where I have the opportunity to contribute to impactful projects that push the boundaries of technology.

    In addition to my technical expertise, I am deeply passionate about <b>cybersecurity</b>, always integrating the latest security measures into my work to ensure that the applications I develop are not only efficient but also secure.

    I am constantly exploring new challenges and seeking innovative ways to enhance my skills and the projects I contribute to, always aiming to make a meaningful impact in the field of technology.`,
  star_up: () =>
    `Our growing startup<br/><br/>${openLink("https://www.yvagacore.tech/")}`, 
  history: (_, __, history) => history.join("<br/>"),
};

export const COMMAND_NAMES = [...Object.keys(COMMANDS), "clear", "help"].sort(
  (a, z) => a.localeCompare(z)
);

export function getCommandResponse(
  { command, sudo, args }: Prompt,
  username: string,
  history: string[]
) {
  if (sudo && !command) return "Usage: sudo [command] [args]";
  if (!command) return "";

  if (command in COMMANDS) {
    let result = COMMANDS[command](username, args, history);
    if (command !== "kali") {
      result = result.replace(/\n/g, "<br/>");
    }

    return result;
  }

  if (command === "help") {
    return `Usage: [command] [options] 
    
      ${COMMAND_NAMES.join(", ")}`.replace(/\n/g, "<br/>");
  }

  return `${command}: command not found`;
}

function openLink(url: string) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 1000);
  return `Redirecting to <a href="${url}" target="_blank" rel="noreferrer noopener">${url}</a>...`;
}
