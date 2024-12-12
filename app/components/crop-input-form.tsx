import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Crop } from "@/lib/definitions";

interface CropInputFormProps {
  crops: Crop[];
  onAddCrop: (crop: Crop) => void;
  onRemoveCrop: (id: string) => void;
}

export function CropInputForm({
  crops,
  onAddCrop,
  onRemoveCrop,
}: CropInputFormProps) {
  const [area, setArea] = React.useState("");
  const [crop, setCrop] = React.useState("");
  const [irrigationMethod, setIrrigationMethod] = React.useState("");
  const [croppingPattern, setCroppingPattern] = React.useState("");

  const handleAddCrop = () => {
    if (area && crop && irrigationMethod && croppingPattern) {
      const newCrop: Crop = {
        id: Date.now().toString(),
        area: parseFloat(area),
        crop,
        irrigationMethod,
        croppingPattern,
      };

      onAddCrop(newCrop);

      // Reset inputs
      setArea("");
      setCrop("");
      setIrrigationMethod("");
      setCroppingPattern("");
    } else {
      alert("Please fill out all fields before adding a crop.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Area (in hectares)</Label>
              <Input
                id="area"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Crop</Label>
              <Input
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="Enter crop name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigation-method">Irrigation Method</Label>
              <Select
                value={irrigationMethod}
                onValueChange={setIrrigationMethod}
              >
                <SelectTrigger id="irrigation-method">
                  <SelectValue placeholder="Select irrigation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flood Irrigation">
                    Flood Irrigation
                  </SelectItem>
                  <SelectItem value="Drip Irrigation">
                    Drip Irrigation
                  </SelectItem>
                  <SelectItem value="Sprinkler Irrigation">
                    Sprinkler Irrigation
                  </SelectItem>
                  <SelectItem value="Canal">Canal</SelectItem>
                  <SelectItem value="Tank">Tank</SelectItem>
                  <SelectItem value="Well">Well</SelectItem>
                  <SelectItem value="Tubewell">Tubewell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropping-pattern">Cropping Pattern</Label>
              <Select
                value={croppingPattern}
                onValueChange={setCroppingPattern}
              >
                <SelectTrigger id="cropping-pattern">
                  <SelectValue placeholder="Select cropping pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monocropping">Monocropping</SelectItem>
                  <SelectItem value="Intercropping">Intercropping</SelectItem>
                  <SelectItem value="Crop Rotation">Crop Rotation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleAddCrop} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Crop
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {crops.map((crop) => (
          <Card key={crop.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold">{crop.crop}</p>
                <p className="text-sm text-muted-foreground">
                  Area: {crop.area} ha | Irrigation: {crop.irrigationMethod} |
                  Pattern: {crop.croppingPattern}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveCrop(crop.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CropInputForm;
