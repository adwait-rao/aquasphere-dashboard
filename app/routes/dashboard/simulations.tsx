import React, { useContext, useEffect, useState } from "react";
import MapLibreMap from "@/components/MapLibreMap";
import { Card, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { CropInputForm } from "@/components/crop-input-form";
import { Crop } from "@/lib/definitions";
import { DamContext } from "@/components/Providers/DamProvider";
import axios from "axios";
import { FileUpload } from "@/components/file-upload";
import { Input } from "@/components/ui/input";
import { Bounce, toast } from "react-toastify";

export default function Simulations() {
  const damContext = useContext(DamContext);
  const { currentDam } = damContext;

  const [simulationData, setSimulationData] = useState({
    crops: [] as Crop[],
    irrigationNetwork: "Canal",
    industrialAreaSpan: "4000",
    domesticAreaPopulation: "4500",
    evapotranspirationRate: 0.6,
    currentWeather: {
      temperature: 0,
      humidity: 0,
      rainfall: 0,
    },
  });

  const [domesticAreaPopulation, setDomesticAreaPopulation] = useState("");
  const [industrialAreaSpan, setIndustrialAreaSpan] = useState("");

  const [weatherData, setWeatherData] = useState({
    temperature: "",
    humidity: "",
    rainfall: "",
    windSpeed: "",
  });

  const [evapotranspiration, setEvapotranspiration] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const handleAddCrop = (newCrop: Crop) => {
    const cropToAdd = {
      ...newCrop,
      id: newCrop.id || Date.now().toString(),
      area: newCrop.area || 10000,
      irrigationMethod: newCrop.irrigationMethod || "Flood Irrigation",
      croppingPattern: newCrop.croppingPattern || "Monocropping",
    };

    setSimulationData((prevData) => ({
      ...prevData,
      crops: [...prevData.crops, cropToAdd],
    }));
  };

  const handleRemoveCrop = (id: string) => {
    setSimulationData((prevData) => ({
      ...prevData,
      crops: prevData.crops.filter((crop) => crop.id !== id),
    }));
  };

  const fetchWeatherData = async () => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${
        currentDam.longitude
      }&lon=${currentDam.latitude}&appid=${
        import.meta.env.VITE_WEATHERMAP_API_KEY
      }`;

      const response = await axios.get(URL);
      const data = response.data;

      const weatherUpdate = {
        temperature: Math.round(data.main.temp - 273.15),
        humidity: data.main.humidity,
        rainfall: data?.rain?.["1h"] || 0,
        windSpeed: data.wind.speed,
      };

      // Update both weatherData and simulationData
      setWeatherData(weatherUpdate);
      setSimulationData((prevData) => ({
        ...prevData,
        currentWeather: {
          temperature: weatherUpdate.temperature,
          humidity: weatherUpdate.humidity,
          rainfall: weatherUpdate.rainfall,
        },
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const calculateEvapotranspiration = () => {
    const calculatedEvapotranspiration = "3.5mm/day";
    setEvapotranspiration(calculatedEvapotranspiration);

    setSimulationData((prevData) => ({
      ...prevData,
      evapotranspirationRate: 0.6,
    }));
  };

  const handleGetPredictions = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/generate",
        simulationData
      );

      console.log(response.data);
      setAiSuggestions(response.data.response);
    } catch (error) {
      console.error("Error getting predictions:", error);
    }
  };

  // const handleFileUpload = (event: any) => {
  //   const URL = "http://localhost:3000";
  //   const file = event.target.files[0];

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   axios
  //     .post(`URL/api/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       toast("File uploaded successfully!", {
  //         position: "bottom-left",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //     })
  //     .catch((error: any) => {
  //       toast.error(error, {
  //         position: "bottom-left",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce,
  //       });
  //     });
  // };

  return (
    <main>
      <PageTitle className="mb-10">Simulations</PageTitle>
      <div className="grid grid-rows-auto gap-4 h-full">
        <div className="row-span-1 h-[30%]">
          <MapLibreMap />
        </div>
        <Card className="p-5 row-span-1">
          <CardTitle className="mb-5">Simulation Metrics</CardTitle>
          <div className="space-y-6">
            <CropInputForm
              crops={simulationData.crops}
              onAddCrop={handleAddCrop}
              onRemoveCrop={handleRemoveCrop}
            />
            <Card className="p-5">
              <CardTitle className="text-sm mb-3">
                Command Area Metrics
              </CardTitle>
              {/* <FileUpload onFileSelect={handleFileUpload} /> */}
              <div>
                <Label htmlFor="domestic-population">
                  Domestic Area Population
                </Label>
                <Input
                  id="domestic-population"
                  value={domesticAreaPopulation}
                  onChange={(e) => {
                    setDomesticAreaPopulation(e.target.value);
                    setSimulationData((prevData: any) => {
                      return {
                        ...prevData,
                        domesticAreaPopulation,
                      };
                    });
                  }}
                  placeholder="Enter population"
                />
              </div>
              <div className="mt-3">
                <Label htmlFor="industrial-area">Industrial Area</Label>
                <Input
                  id="industrial-area"
                  value={industrialAreaSpan}
                  onChange={(e) => {
                    setIndustrialAreaSpan(e.target.value);
                    setSimulationData((prevData: any) => {
                      return {
                        ...prevData,
                        industrialAreaSpan,
                      };
                    });
                  }}
                  placeholder="Enter area"
                />
              </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Current Weather Data
                </Label>
                <Button
                  className="bg-yellow-400 w-full"
                  onClick={fetchWeatherData}
                >
                  Fetch Weather Data from location
                </Button>
                <div className="text-orange-500/50">
                  Temperature: {weatherData.temperature}°C
                  <br />
                  Humidity: {weatherData.humidity}%
                  <br />
                  Rainfall: {weatherData.rainfall} mm
                  <br />
                  Wind Speed: {weatherData.windSpeed} m/s
                </div>
              </div>
              <div>
                <Label
                  htmlFor="irrigation-type"
                  className="text-sm font-medium text-gray-700"
                >
                  Evapotranspiration
                </Label>
                <Button
                  className="w-full"
                  onClick={calculateEvapotranspiration}
                >
                  Calculate Evapotranspiration
                </Button>
                <div className="text-green-300/50">
                  Evapotranspiration: {evapotranspiration}
                </div>
              </div>
            </div>
            <Button
              onClick={handleGetPredictions}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Get Predictions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle className="mb-5">Simulation Results</CardTitle>
          {aiSuggestions && (
            <p className="">{aiSuggestions?.shortActionableInsights}</p>
          )}
          Suggested Crops:
          <div className="flex gap-5 mt-5">
            {aiSuggestions?.suggestedCrops.map((crop) => {
              return (
                <main className="rounded-lg p-5 border-[1px] border-slate-400/30">
                  {crop}
                </main>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
}
