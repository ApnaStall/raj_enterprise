import Cropper from "react-easy-crop";
import { useState } from "react";

function AvatarCropModal({ image, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[90%] max-w-md">

        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}        // 🔥 square
            cropShape="round" // 🔥 circle preview
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, pixels) =>
              setCroppedAreaPixels(pixels)
            }
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-full mt-4"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onCropDone(croppedAreaPixels)}
            className="px-4 py-2 bg-[#03519F] text-white rounded-lg"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarCropModal;
