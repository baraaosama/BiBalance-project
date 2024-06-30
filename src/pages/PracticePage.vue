<template>
  <canvas
    id="unity-canvas"
    width=100%
    height=600
    style="width: 100%; height: 600px; background: #808080">
  </canvas>
</template>

<script setup>
import { onMounted } from 'vue';
//token 
const token = localStorage.getItem('token')?localStorage.getItem('token'):null;
const sendMessage = (object, method, param) => {
  window.gameInstance.SendMessage(object, method, param);
};

onMounted(() => {
  if(!token){
    window.location.href = '/login';
    }
  const file = 'BIB';
  const script = document.createElement('script');
  script.onload = () => {
    
    createUnityInstance(document.querySelector('#unity-canvas'), {
      dataUrl: `Build/${file}.data`,
      frameworkUrl: `Build/${file}.framework.js`,
      codeUrl: `Build/${file}.wasm`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'YOUR_COMPANY_NAME',
      productName: 'YOUR_PRODUCT_NAME',
      productVersion: 'YOUR_VERSION_NUMBER',
      // matchWebGLToCanvasSize: false,
      // Uncomment above to separately control WebGL canvas render size and DOM element size.
      // devicePixelRatio: 1,
      // Uncomment above to override low DPI rendering on high DPI displays.
    }).then((unityInstance) => {
      // setting this allows the usage of "window.gameInstance" in jslib plugins inside Unity
      // it also sets up a simple shortcut we can use to provide a path into Unity from vue
      window.gameInstance = unityInstance;
    });
  };
  script.async = true;
  script.src = `Build/${file}.loader.js`;
  document.head.appendChild(script);
});

</script>