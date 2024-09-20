
import Image from "next/image";
import { auth } from "@/auth";
import { doLogout } from "../actions";
import { redirect } from "next/navigation";

const Dashboard = async () => {
    const session = await auth();

    if (!session?.user) redirect("/auth/login");

    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
            />
            <form action={doLogout}>
            <button type="submit" className=" px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Logout
          </button>
            </form>
            

        </div>
    );
};

export default Dashboard;