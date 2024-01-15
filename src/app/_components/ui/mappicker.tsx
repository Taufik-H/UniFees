"use client";
import { TbPointFilled } from "react-icons/tb";

import * as React from "react";
import { createRoot } from "react-dom/client";
// import { Wrapper, type Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

const MapPicker = ({
  onClick,
  markers,
  onClickMarker,
  selectedPosition,
}: {
  onClick: (e: google.maps.MapMouseEvent) => void;
  onClickMarker: (reportDataId: string) => void;
  markers?: ({ latLng: google.maps.MarkerOptions["position"] } & {
    reportDataId: string;
  })[];
  selectedPosition?: google.maps.LatLng;
}) => {
  const [zoom, setZoom] = React.useState(13); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: -6.905709,
    lng: 107.570699,
  });

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  // const form = (
  //   <div
  //     style={{
  //       padding: "1rem",
  //       flexBasis: "250px",
  //       height: "100%",
  //       overflow: "auto",
  //     }}
  //   >
  //     <label htmlFor="zoom">Zoom</label>
  //     <input
  //       type="number"
  //       id="zoom"
  //       name="zoom"
  //       value={zoom}
  //       onChange={(event) => setZoom(Number(event.target.value))}
  //     />
  //     <br />
  //     <label htmlFor="lat">Latitude</label>
  //     <input
  //       type="number"
  //       id="lat"
  //       name="lat"
  //       value={center.lat}
  //       onChange={(event) =>
  //         setCenter({ ...center, lat: Number(event.target.value) })
  //       }
  //     />
  //     <br />
  //     <label htmlFor="lng">Longitude</label>
  //     <input
  //       type="number"
  //       id="lng"
  //       name="lng"
  //       value={center.lng}
  //       onChange={(event) =>
  //         setCenter({ ...center, lng: Number(event.target.value) })
  //       }
  //     />
  //     <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
  //     {clicks.map((latLng, i) => (
  //       <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
  //     ))}
  //     <button onClick={() => onClick(undefined)}>Clear</button>
  //   </div>
  // );

  // const radiusSize = getPixelsPerMeter(selectedPosition?.lat() ?? 0, zoom);
  // console.log({ radiusSize });
  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* <Wrapper apiKey="AIzaSyDaNiN-jv_uekKLWWmBNR4TNkAcJQiRak8" render={render}>
        <Map
          onZoomChanged={(map) => {
            setZoom(map.getZoom()!);
          }}
          center={center}
          onClick={(e) => {
            onClick(e);
          }}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "400px" }}
          selectedPosition={selectedPosition}
        >
          {markers?.map(({ latLng, reportDataId }, i) => (
            <Marker
              reportDataId={reportDataId}
              onClick={onClickMarker}
              key={i}
              icon={{
                url: "/assets/marker.svg",
                scaledSize: new google.maps.Size(40, 40),
              }}
              title="Click to zoom"
              position={latLng}
            />
          ))}
        </Map>
      </Wrapper> */}
      {/* Basic form for controlling center and zoom of map. */}
      {/* {form} */}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: Record<string, string>;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  onZoomChanged?: (map: google.maps.Map) => void;
  selectedPosition?: google.maps.LatLng;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  onZoomChanged,
  selectedPosition,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  useSelectedPositionMarker(
    {
      position: selectedPosition,
      map: map,
    },
    map,
  );
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  // useDeepCompareEffectForMaps(() => {
  //   if (map) {
  //     map.setOptions(options);
  //   }
  // }, [map, options]);

  React.useEffect(() => {
    if (map) {
      google.maps.event.addListener(map, "zoom_changed", () => {
        onZoomChanged && onZoomChanged(map);
      });
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-expect-error missing types
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<
  google.maps.MarkerOptions & {
    reportDataId: string;
    onClick: (reportDataId: string) => void;
  }
> = ({ reportDataId, onClick, ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(
        new google.maps.Marker({
          clickable: true,
        }),
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      marker.addListener("click", () => {
        onClick(reportDataId);
      });
    }
  }, [marker, options]);

  return null;
};

// const SelectedPositionMarker: React.FC<google.maps.MarkerOptions> = ({
//   ...options
// }) => {
//   const [marker, setMarker] = React.useState<google.maps.Marker>();
//   const [circle, setCircle] = React.useState<google.maps.Circle>();
//   React.useEffect(() => {
//     if (!marker) {
//       const marker = new google.maps.Marker();
//       setMarker(marker);
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   React.useEffect(() => {
//     if (!circle) {
//       const circle = new google.maps.Circle({
//         strokeColor: "#c3fc49",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#c3fc49",
//         fillOpacity: 0.35,
//         center: options.position,
//         radius: 15000, // in meters
//       });
//       setCircle(circle);
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (circle) {
//         circle.setMap(null);
//       }
//     };
//   }, [circle]);

//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options);
//     }
//   }, [marker, options]);

//   // Bind the circle to the marker
//   React.useEffect(() => {
//     if (circle && marker) {
//       circle.bindTo("center", marker, "position");
//     }
//   }, [circle, marker]);

//   return null;
// };

const useSelectedPositionMarker = (
  options: google.maps.MarkerOptions,
  map: google.maps.CircleOptions["map"],
) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const [circle, setCircle] = React.useState<google.maps.Circle>();
  React.useEffect(() => {
    if (!marker) {
      const marker = new google.maps.Marker();
      setMarker(marker);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (!circle && map) {
      const circle = new google.maps.Circle({
        strokeColor: "#c3fc49",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#c3fc49",
        fillOpacity: 0.35,
        center: options.position,
        map: map,
        radius: 1000, // in meters
        clickable: false,
      });
      setCircle(circle);
    }

    // remove marker from map on unmount
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle, map]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  // Bind the circle to the marker
  React.useEffect(() => {
    if (circle && marker) {
      circle.bindTo("center", marker, "position");
    }
  }, [circle, marker]);
};

// const Radius: React.FC<{
//   latlng: google.maps.LatLng;
// }> = ({ latlng }) => {
//   const [circle, setCircle] = React.useState<google.maps.Circle>();

//   React.useEffect(() => {
//     if (!circle) {
//       setCircle(
//         new google.maps.Circle({
//           strokeColor: "#c3fc49",
//           strokeOpacity: 0.8,
//           strokeWeight: 2,
//           fillColor: "#c3fc49",
//           fillOpacity: 0.35,
//           center: latlng,
//           radius: 15000, // in meters
//         }),
//       );
//     }

//     Reacct.useEffect(() => {
//       if (circle) {
//         circle.bindTo("center", marker, "position");
//       }
//     }, [circle]);

//     // remove marker from map on unmount
//     return () => {
//       if (circle) {
//         circle.setMap(null);
//       }
//     };
//   }, [circle]);

//   return null;
// };

// const deepCompareEqualsForMaps = createCustomEqual(
//   (deepEqual) => (a: any, b: any) => {
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }

//     // TODO extend to other types

//     // use fast-equals for other objects
//     return deepEqual(a, b);
//   },
// );

// function useDeepCompareMemoize(value: any) {
//   const ref = React.useRef();

//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value;
//   }

//   return ref.current;
// }

// function useDeepCompareEffectForMaps(
//   callback: React.EffectCallback,
//   dependencies: any[],
// ) {
//   React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

// const EARTH_CIRCUMFERENCE_METERS = 40075016.686;

// function getPixelsPerMeter(lat: number, zoom: number): number {
//   const pixelsPerTile = 256 * zoom;
//   const numTiles: number = Math.pow(2, zoom);
//   const metersPerTile: number =
//     (Math.cos(toRadians(lat)) * EARTH_CIRCUMFERENCE_METERS) / numTiles;

//   return pixelsPerTile / metersPerTile;
// }

// function toRadians(degrees: number): number {
//   return degrees * (Math.PI / 180);
// }

export default MapPicker;
