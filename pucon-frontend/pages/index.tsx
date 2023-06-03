import Image from "next/image";
import { Inter } from "next/font/google";
import { globalContext } from "@/store/GlobalContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const {
    globalData: { loggedIn },
  } = useContext(globalContext);
  if (!loggedIn) router.push("/login");
  router.push("/feed");
  return null;
}
