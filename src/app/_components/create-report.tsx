import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface FormData {
  location: string;
  costPrizeFrom: number;
  costPrizeTo: number;
  foodPrizeFrom: number;
  foodPrizeTo: number;
  transportationPrizeFrom: number;
  transportationPrizeTo: number;
  longitude: number;
  latitude: number;
}

const CreateReport = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const createReport = api.userReport.createReport.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const convertData: FormData = {
        ...data,
        costPrizeFrom: Number(data.costPrizeFrom),
        costPrizeTo: Number(data.costPrizeTo),
        foodPrizeFrom: Number(data.foodPrizeFrom),
        foodPrizeTo: Number(data.foodPrizeTo),
        transportationPrizeFrom: Number(data.transportationPrizeFrom),
        transportationPrizeTo: Number(data.transportationPrizeTo),
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
      };
      createReport.mutate(convertData);
      toast.success("Berhasil membuat laporan");
    } catch (error) {
      toast.error("Gagal membuat laporan");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Cost Prize From"
          {...register("costPrizeFrom")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Cost Prize To"
          {...register("costPrizeTo")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Food Prize From"
          {...register("foodPrizeFrom")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Food Prize To"
          {...register("foodPrizeTo")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Transportation Prize From"
          {...register("transportationPrizeFrom")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Transportation Prize To"
          {...register("transportationPrizeTo")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Longitude"
          {...register("longitude")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Latitude"
          {...register("latitude")}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createReport.isLoading}
        >
          {createReport.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
