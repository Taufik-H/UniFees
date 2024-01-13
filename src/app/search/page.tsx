"use client";

import React from "react";
import MapPicker from "../_components/ui/mappicker";
import { api } from "@/trpc/react";
const SearchPage = () => {
  const [latLng, setLatLng] = React.useState<google.maps.LatLng>();

  const { data, isLoading } = api.userReport.findReportsInRadius.useQuery({
    longitude: latLng?.lng() ?? 0,
    latitude: latLng?.lat() ?? 0,
    radiusMeter: 1000,
  });
  return (
    <div>
      <MapPicker
        onClick={(e) => {
          setLatLng(e.latLng);
        }}
        markers={
          isLoading
            ? []
            : data?.map((report) => ({
                latLng: new google.maps.LatLng(
                  report.latitude ?? 0,
                  report.longitude ?? 0,
                ),
              })) ?? []
        }
      />
    </div>
  );
};

export default SearchPage;
