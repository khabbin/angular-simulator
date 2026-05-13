import { Preset } from "@primeuix/themes/types";
import { ColorPreset } from "../enums/ColorPreset";

export interface ITheme {
  name: string;
  value: ColorPreset;
  preset: Preset;
}