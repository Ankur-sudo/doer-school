import { BASE_URL_DEV } from "@/lib/api/apiSlice";

export default function ({ path }: { path: string }) {
    const replaced = path?.replace("\\", "/");
    return BASE_URL_DEV + "/" + replaced;
}
