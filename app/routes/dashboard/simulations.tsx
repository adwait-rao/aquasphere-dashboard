import MapLibreMap from "@/components/MapLibreMap";
import { Card, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { SimpleMultiSelect } from "@/components/SimpleMultiSelect";
import { useState } from "react";

export default function Simulations() {
  const cropOptions = [
    "Wheat",
    "Rice",
    "Corn",
    "Soybeans",
    "Barley",
    "Oats",
    "Cotton",
  ];

  const [crops, setCrops] = useState<string[]>();

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="irrigation-type"
                  className="text-sm font-medium text-gray-700"
                >
                  Irrigation Type
                </Label>
                <Select
                // onValueChange={setIrrigationMethod}
                // value={irrigationMethod}
                >
                  <SelectTrigger id="irrigation-type" className="w-full mt-1">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="crops"
                  className="text-sm font-medium text-gray-700"
                >
                  Crops
                </Label>
                <div className="mt-1">
                  <SimpleMultiSelect
                    options={cropOptions}
                    onChange={setCrops}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="irrigation-type"
                  className="text-sm font-medium text-gray-700"
                >
                  Irrigation Network Type
                </Label>
                <Select
                // onValueChange={setIrrigationMethod}
                // value={irrigationMethod}
                >
                  <SelectTrigger id="irrigation-type" className="w-full mt-1">
                    <SelectValue placeholder="Select irrigation network type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="irrigation-method"
                  className="text-sm font-medium text-gray-700"
                >
                  Irrigation Method
                </Label>
                <Select
                // onValueChange={setIrrigationMethod}
                // value={irrigationMethod}
                >
                  <SelectTrigger id="irrigation-method" className="w-full mt-1">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canal">Canal</SelectItem>
                    <SelectItem value="tank">Tank</SelectItem>
                    <SelectItem value="well">Well</SelectItem>
                    <SelectItem value="tubewell">Tubewell</SelectItem>
                    <SelectItem value="drip">Drip</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="croppingPattern"
                  className="text-sm font-medium text-gray-700"
                >
                  Cropping Pattern
                </Label>
                <Select
                // onValueChange={setCroppingPattern}
                // value={croppingPattern}
                >
                  <SelectTrigger id="croppingPattern" className="w-full mt-1">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monoculture">Monoculture</SelectItem>
                    <SelectItem value="rotation">Crop Rotation</SelectItem>
                    <SelectItem value="intercropping">Intercropping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Current Weather Data
                </Label>
                <Button className="bg-yellow-400 w-full">
                  Fetch Weather Data from location
                </Button>
                <div className="text-orange-500/50">
                  Temperature: Humidity: Rainfall: Wind Speed:
                </div>
              </div>
              <div>
                <Label
                  htmlFor="irrigation-type"
                  className="text-sm font-medium text-gray-700"
                >
                  Evapotranspiration
                </Label>
                <Button className="w-full">
                  Calculate Evaportranspiration
                </Button>
                <div className="text-green-300/50">
                  Evapotranspiration: 000.3unit
                </div>
              </div>
            </div>
            <Button
              // onClick={onSubmit}
              // disabled={isSubmitDisabled}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Get Predictions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
        <Card className="p-5">
          <CardTitle className="mb-5">Simulation Results</CardTitle>
        </Card>
      </div>
    </main>
  );
}
