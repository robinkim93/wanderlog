import { Logo } from "../logo";

export const Footer = () => {
  return (
    <footer className="pb-10 relative bottom-0">
      <div className="border mb-5"></div>
      <div className="flex justify-between">
        <Logo />
        <div>© Robin. All rights reserved.</div>
      </div>
    </footer>
  );
};
