declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Thêm các biến khác ở đây...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}