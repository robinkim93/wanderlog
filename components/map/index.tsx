"use client";

import Script from "next/script";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { CustomPagination } from "./pagination";
import { PlaceListCard } from "./place-list-card";
import { InfoWindow } from "./info-window";
import { usePlaceListSave } from "@/hooks/usePlaceListSave";
import { SearchInput } from "../search-input";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

const KAKAO_SDK_URL = process.env.NEXT_PUBLIC_KAKAO_SDK_URL!;

export interface IMarker {
  position: {
    lat: number;
    lng: number;
  };
  address_name: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  id: string;
  place_url: string;
  place_name: string;
  road_address_name: string;
  isSelected: boolean;
}

export const KaKaoMap = () => {
  const [info, setInfo] = useState<IMarker>();
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [search, setSearch] = useState<string>();
  const [listMode, setListMode] = useState<"search" | "save">("search");
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const { placeList, addPlaceList, removePlaceList } = usePlaceListSave();
  const placeListRef = useRef<HTMLDivElement | null>(null);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearchButton = () => {
    initMap({ searchKeyword: search });
    setListMode("search");
  };

  const onClickPlaceListSaveButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    marker: IMarker
  ) => {
    e.stopPropagation();
    setMarkers((prev) => {
      const prevMarkers = [...prev];
      const newMarkers = prevMarkers.map((markerData) => {
        if (markerData.id === marker.id) {
          return { ...markerData, isSelected: true };
        }
        return markerData;
      });

      return newMarkers;
    });
    addPlaceList(marker);
  };

  const onClickPlaceListRemoveButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    marker: IMarker
  ) => {
    e.stopPropagation();
    setMarkers((prev) => {
      const prevMarkers = [...prev];
      const newMarkers = prevMarkers.map((markerData) => {
        if (markerData.id === marker.id) {
          return { ...markerData, isSelected: false };
        }
        return markerData;
      });

      return newMarkers;
    });
    removePlaceList(marker.id);
  };

  const onClickMarker = (marker: IMarker) => {
    setInfo(marker);
  };

  useEffect(() => {
    initMap({});
  }, [map]);

  useEffect(() => {
    console.log(placeListRef.current?.scroll);
  }, [placeListRef]);

  const initMap = ({ searchKeyword }: { searchKeyword?: string }) => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      searchKeyword ? searchKeyword : "",
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers: IMarker[] = [];

          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: +data[i].y,
                lng: +data[i].x,
              },
              address_name: data[i].address_name,
              category_group_name: data[i].category_group_name,
              category_name: data[i].category_name,
              distance: data[i].distance,
              phone: data[i].phone,
              id: data[i].id,
              place_url: data[i].place_url,
              place_name: data[i].place_name,
              road_address_name: data[i].road_address_name,
              isSelected: false,
            });
          }
          bounds.extend(new kakao.maps.LatLng(+data[0].y, +data[0].x));
          setMarkers(markers);
          setPagination(_pagination);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          console.log(bounds, data[0]);
          map.setBounds(bounds);
          map.setLevel(6);
        }
      }
    );
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div className="flex-1 w-full h-full bg-inherit">
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src={KAKAO_SDK_URL}
      ></Script>
      <div className="flex w-full h-full">
        <div className="min-w-[350px] h-full overflow-y-scroll pr-5 pt-1 pl-1 scrollbar-hide relative">
          <div className="w-full mb-5 items-center sticky top-0 flex flex-col space-y-2 bg-neutral-100">
            <SearchInput
              onChangeSearchInput={onChangeSearchInput}
              onClickButton={onClickSearchButton}
              search={search}
            />
            <div className="flex space-x-2 w-full">
              <Button className="w-full" onClick={() => setListMode("search")}>
                검색결과
              </Button>
              <Button className="w-full" onClick={() => setListMode("save")}>
                저장목록
              </Button>
            </div>
          </div>
          <div id="place-list" className="flex flex-col" ref={placeListRef}>
            {listMode === "search"
              ? markers.map((marker) => {
                  return (
                    <PlaceListCard
                      key={marker.id}
                      marker={marker}
                      setInfo={setInfo}
                      info={info}
                      onClickSaveButton={(e) =>
                        onClickPlaceListSaveButton(e, marker)
                      }
                      buttonType={"save"}
                    />
                  );
                })
              : placeList.map((place) => (
                  <PlaceListCard
                    key={place.id}
                    marker={place}
                    setInfo={setInfo}
                    info={info}
                    onClickSaveButton={(e) =>
                      onClickPlaceListRemoveButton(e, place)
                    }
                    buttonType={"remove"}
                  />
                ))}
          </div>
          <div className="mt-5">
            {pagination && listMode === "search" && (
              <CustomPagination _pagination={pagination} />
            )}
          </div>
        </div>

        <Map // 로드뷰를 표시할 Container
          center={
            info
              ? info.position
              : {
                  lat: 37.566826,
                  lng: 126.9786567,
                }
          }
          className="w-full h-full"
          level={info ? 3 : 6}
          onCreate={setMap}
        >
          {markers.map((marker) => {
            return (
              <>
                <MapMarker
                  key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => onClickMarker(marker)}
                  {...(marker.isSelected
                    ? {
                        image: {
                          src: "/map-marker.png",
                          size: { width: 64, height: 69 },
                        },
                      }
                    : {
                        image: {
                          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                          size: { width: 30, height: 30 },
                        },
                      })}
                >
                  {info && info.place_name === marker.place_name && (
                    <InfoWindow marker={marker} />
                  )}
                </MapMarker>
              </>
            );
          })}
        </Map>
      </div>
    </div>
  );
};
