import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggel";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import { MoonStar } from "lucide-react";

export default function EditorNavbar() {
  return (
    <div className="flex justify-between px-7  py-3">
      <Logo />

      <div className="flex gap-3">
        <ModeToggle />
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          className="rounded-full py-0 px-0"
        >
          <FaGithub className="size-5" />
        </Button>
        <Button size={"sm"} className="text-xs">
          Log in
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="rounded-full border-primary text-primary text-xs"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
