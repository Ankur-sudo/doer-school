import { useGetDivisionQuery } from "@/lib/api/apiSlice";

interface Props {
  uuid: string;
}

export default function SelectDivisionView({}: Props) {
  const {
    data: division,
    isLoading,
    isFetching,
  } = useGetDivisionQuery({
    start: 0,
    length: 1000,
  });

  if (!division?.data.length) {
    return "";
  }
  return division?.data[0].nameEn;
}
