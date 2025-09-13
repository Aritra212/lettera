import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggel";
import { Button } from "@/components/ui/button";
import { MoonStar } from "lucide-react";

export default function EditorNavbar() {
  return (
    <div className="flex justify-between px-7  py-2">
      <Logo />

      <div className="flex gap-2">
        <ModeToggle />
        <Button className="min-w-28">Log in</Button>
        <Button
          className="min-w-28 rounded-full border-primary text-primary"
          variant={"outline"}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
