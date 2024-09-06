import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <Card className="w-full max-w-md bg-muted/50 shadow-xl border-none rounded-md p-6">
        <CardHeader>
          <CardTitle className="text-center relative">
            <span className="text-[#353132] font-bold text-3xl tracking-tighter leading-none pr-2">
              Activation Successful!
            </span>
          </CardTitle>
          <CardDescription>
            Your Kodi device is now successfully linked. Enjoy your streaming
            experience without any interruptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8"></CardContent>
        <CardFooter>
          <Link href={"/"} className={buttonVariants({ variant: "link" })}>
            Return to Home
          </Link>
        </CardFooter>
      </Card>
    </main>

    // <main className="flex min-h-screen flex-col items-center gap-10 p-24">
    //   <Card className="bg-muted/50 shadow-xl border-none rounded-md p-6">
    //     <CardHeader>
    //       <CardTitle className="text-center relative">
    //         <span className="text-[#353132] font-bold text-3xl tracking-tighter leading-none pr-2">
    //           Success
    //         </span>
    //       </CardTitle>
    //     </CardHeader>
    //     <CardContent className="grid gap-8"></CardContent>
    //     <CardFooter>
    //       <Link href={"/"} className={buttonVariants({ variant: "link" })}>
    //         Go to Home
    //       </Link>
    //     </CardFooter>
    //   </Card>
    // </main>
  );
}
