declare module "*.css" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.scss" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.yaml" {
  const mapping: Record<string, any>;
  export default mapping;
}
