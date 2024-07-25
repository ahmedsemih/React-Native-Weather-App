import { UV_INDEX } from "./constants";

export default function (uv: number) {
  if (uv <= 2) return UV_INDEX.SAFE;
  if (uv <= 5) return UV_INDEX.PROTECTION_REQUIRED;
  if (uv <= 7) return UV_INDEX.PROTECTION_ESSENTIAL;
  if (uv <= 10) return UV_INDEX.NEED_SHADE;
  return UV_INDEX.DONT_GO_OUTSIDE;
}
