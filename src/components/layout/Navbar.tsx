'use client'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-[9990] pointer-events-none px-6 py-8">
      <nav className="max-w-[1400px] mx-auto flex justify-center items-center pointer-events-auto">
        <ul className="flex gap-8 sm:gap-12 items-center">
          {['Home', 'About', 'Projects', 'Internships', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                data-cursor-hover={true}
                className="block px-2 py-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#ffffff] transition-colors duration-300 hover:text-[#FFB6C1]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
