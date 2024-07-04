const onCrop = async (cropperRef,setCropper) => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas: any = cropperRef.current.cropper.getCroppedCanvas();

      const croppedImageBase64 = croppedCanvas.toDataURL();


      const coverImageElement = document.getElementById(
        "coverImage"
      ) as HTMLImageElement;

      if (coverImageElement) {
        coverImageElement.setAttribute("xlink:href", croppedImageBase64);
      }

      setCropper(croppedImageBase64);
      return croppedImageBase64;
    }
  };

  export { onCrop }