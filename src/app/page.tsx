import Image from "next/image";
import { Button } from "@/components/ui/button"
import localFont from "next/font/local";

const hyWenHei = localFont({
  src: './zhcn.tff',
})

export default function Home() {
  return (
    <div>
      <Button variant="normal">Furina</Button>
    </div>
  );
}
