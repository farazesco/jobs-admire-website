import {
  EMAIL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants/app";
import Link from "next/link";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTwitterXLine,
  RiLinkedinBoxFill,
  RiMailFill,
} from "react-icons/ri";

const SocialCard = ({ icon, link, variant = "primary" }) => {
  const Icon = icon;

  return (
    <Link
      href={link}
      className={`flex justify-center items-center w-10 h-10 rounded-l-lg drop-shadow-md hover:w-12 transition-all ${
        variant === "primary" ? "bg-secondary" : "bg-primary"
      }`}
    >
      <Icon
        className={`w-5 h-5 ${
          variant === "primary" ? "text-black" : "text-white"
        }`}
      />
    </Link>
  );
};

const Socials = () => {
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex flex-col items-end gap-2.5">
      <SocialCard icon={RiFacebookBoxFill} link={FACEBOOK_URL} />
      <SocialCard icon={RiInstagramFill} link={INSTAGRAM_URL} />
      {/* <SocialCard icon={RiTwitterXLine} link="https://twitter.com" /> */}
      <SocialCard icon={RiLinkedinBoxFill} link={LINKEDIN_URL} />
      <SocialCard icon={RiMailFill} link={EMAIL_URL} variant="secondary" />
    </div>
  );
};

export default Socials;
