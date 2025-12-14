import Link from "next/link";

export default function CreateYours() {
  return (
    <p className="text-center font-(family-name:--font-geist-mono) font-medium mt-9">
      Don`t have an account?
      <Link href={"/register"} className="text-blue-600 ms-2">
        Create yours
      </Link>
    </p>
  );
}
