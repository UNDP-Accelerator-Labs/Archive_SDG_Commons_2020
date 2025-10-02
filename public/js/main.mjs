function res200 () {
  const canvas = document.createElement("canvas");

  // Set the canvas dimensions to the image dimensions
  canvas.width = this.width;
  canvas.height = this.height;

  // Get the canvas context
  const ctx = canvas.getContext("2d");

  // Draw the image on the canvas
  ctx.drawImage(this, 0, 0);

  // Get the Base64-encoded data
  const dataURL = canvas.toDataURL();
  document.body.innerHTML = dataURL;
}

function res404 () {
  document.body.innerHTML = '404'
}

async function onLoad() {
  const params = new URLSearchParams(document.location.search);
  const doc = params.get("doc");
  
  if (doc) { // This is a document page
    const source = `/blobs/${doc}`;
    const img = new Image();
    img.onload = res200;
    img.onerror = res404;
    img.src = source;
  } else { // This is a registry
    document.body.innerHTML = '404'
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    onLoad();
  });
} else {
  (async () => {
    await onLoad();
  })();
}
