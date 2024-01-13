"use client";

import React from "react";
import MapPicker from "../_components/ui/mappicker";
import { api } from "@/trpc/react";
const SearchPage = () => {
  const [latLng, setLatLng] = React.useState<google.maps.LatLng>();
  const [selectedReportId, setSelectedReportId] = React.useState<string | null>(
    null,
  );

  const { data, isLoading } = api.userReport.findReportsInRadius.useQuery({
    longitude: latLng?.lng() ?? 0,
    latitude: latLng?.lat() ?? 0,
    radiusMeter: 1000,
  });

  const { data: selectedReport } = api.userReport.getById.useQuery(
    selectedReportId + "",
    {
      enabled: !!selectedReportId,
    },
  );

  console.log({ selectedReport });

  return (
    <div>
      <MapPicker
        selectedPosition={latLng}
        onClick={(e) => {
          setLatLng(e.latLng);
        }}
        onClickMarker={(reportDataId) => {
          setSelectedReportId(reportDataId);
        }}
        markers={
          isLoading
            ? []
            : data?.map((report) => ({
                reportDataId: report.id,
                latLng: new google.maps.LatLng(
                  report.latitude ?? 0,
                  report.longitude ?? 0,
                ),
              })) ?? []
        }
      />
      {selectedReport && (
        <div>
          Selected:
          <p>ID : {selectedReport.id}</p>
          <p>Latitude : {selectedReport.latitude}</p>
          <p>Longitude : {selectedReport.longitude}</p>
          {/* Show all in types */}
          <p>Food : {selectedReport.foodPrizeFrom}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
