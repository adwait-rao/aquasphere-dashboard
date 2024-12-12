import { useState } from "react";
import { Upload, FileType, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function Reports() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus("idle");

    const formData = new FormData();
    formData.append("file", file);

    const URL = "http://localhost:3000";

    axios
      .post(`${URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast("File uploaded successfully!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch((error: any) => {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>Upload your CSV or XLSX file here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Choose File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select File
                </Button>
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "No file chosen"}
                </span>
              </div>
            </div>
            {file && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FileType className="h-4 w-4" />
                <span>{file.type || "Unknown file type"}</span>
                <span>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            Upload Dataset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
