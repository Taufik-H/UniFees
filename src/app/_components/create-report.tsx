"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateReport = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [costPrizeFrom, setCostPrizeFrom] = useState(0);
  const [costPrizeTo, setCostPrizeTo] = useState(0);
  const [foodPrizeFrom, setFoodPrizeFrom] = useState(0);
  const [foodPrizeTo, setFoodPrizeTo] = useState(0);
  const [transportationPrizeFrom, setTransportationPrizeFrom] = useState(0);
  const [transportationPrizeTo, setTransportationPrizeTo] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const createReport = api.userReport.createReport.useMutation({
    onSuccess: () => {
      router.refresh();
      setLocation("");
      setCostPrizeFrom(0);
      setCostPrizeTo(0);
      setFoodPrizeFrom(0);
      setFoodPrizeTo(0);
      setTransportationPrizeFrom(0);
      setTransportationPrizeTo(0);
      setLongitude(0);
      setLatitude(0);
    },
  });
  return (
    <div>
      <h1>Create Report</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createReport.mutate({
            location,
            costPrizeFrom,
            costPrizeTo,
            foodPrizeFrom,
            foodPrizeTo,
            transportationPrizeFrom,
            transportationPrizeTo,
            longitude,
            latitude,
          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-md border-2 border-gray-300 p-2       "
        />
        <input
          type="number"
          placeholder="Cost Prize From"
          onChange={(e) => setCostPrizeFrom(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Cost Prize To"
          onChange={(e) => setCostPrizeTo(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Food Prize From"
          onChange={(e) => setFoodPrizeFrom(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Food Prize To"
          onChange={(e) => setFoodPrizeTo(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Transportation Prize From"
          onChange={(e) => setTransportationPrizeFrom(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Transportation Prize To"
          onChange={(e) => setTransportationPrizeTo(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Longitude"
          onChange={(e) => setLongitude(parseInt(e.target.value))}
          className="rounded-md border-2 border-gray-300 p-2"
        />
        <input
          type="number"
          placeholder="Latitude"
          onChange={(e) => setLatitude(parseInt(e.target.value))}
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
