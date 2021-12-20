import Link from "next/link"

import { HiOutlineHome, HiOutlineSearch, HiOutlineInformationCircle } from "react-icons/hi"

export default function Layout({ children }) {
  return (
    <div>
      <div className="main">
        <div id="bandeau">
          Ce site est en version beta : soyez indulgent et{" "}
          <Link href="/contribuer">
            <a>faites vos retours</a>
          </Link>{" "}
          ! Le code et les données{" "}
          <a href="https://github.com/transparencemedia/site" target="_blank" rel="noreferrer">
            sont ouverts.
          </a>
        </div>
        <ul id="menu">
          <li>
            <Link href="/">
              <a>
                <HiOutlineHome />
                <span>Accueil</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/kiosque">
              <a>
                <HiOutlineSearch />
                <span>Kiosque</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/a-propos">
              <a>
                <HiOutlineInformationCircle />
                <span>À&nbsp;propos</span>
              </a>
            </Link>
          </li>
        </ul>
        <main>{children}</main>
      </div>
    </div>
  )
}
