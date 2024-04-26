import {
  HiHome,
  HiInformationCircle,
  HiAcademicCap,
  HiMail,
} from "react-icons/hi";
export const NavbarLinks = [
  {
    title: "Home",
    path: "/",
    icon: <HiHome fontSize={20} />,
  },
  {
    title: "Catalog",
    // path: '/catalog',
  },
  {
    title: "All Courses",
    path: "/all-courses",
    icon: <HiAcademicCap fontSize={20} />,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <HiInformationCircle fontSize={20} />,
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <HiMail fontSize={20} />,
  },
];
